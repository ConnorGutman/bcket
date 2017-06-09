import React, { Component } from 'react';
import fileType from 'file-type';
import FileUpload from './FileUpload/FileUpload';
import FileDownload from './FileDownload/FileDownload';
import FileView from './FileView/FileView';
import NodeStatus from './NodeInfo/NodeStatus';
import NodeStats from './NodeInfo/NodeStats';

class Core extends React.Component {
  constructor() {
    super()
    this.state = {offOn: 'flash_off', nodeStats: 'Loading..', currentHash: '', gatewayLink: '', uploadTime: '', uploadComplete: false, currentExtension: '', currentFileSize: '', downloadStarted: false, UorD: 'file_upload'};
    this.ipfs = {}

    // bind methods
    this.startCore = this.startCore.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
    this.uploadStatus = this.uploadStatus.bind(this)
    this.createFileBlob = this.createFileBlob.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
    this.getFile = this.getFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.startCore();
  }

  startCore() {
    this.ipfs = new Ipfs({
      init: true,
      start: true,
      repo: 'ipfs-testing',
      config: {
        Bootstrap: [
          "/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
          "/dns4/sfo-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx",
          "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
          "/dns4/sfo-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z",
          "/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
          "/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
          "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
          "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64"
        ]
      }
    })

    this.ipfs.on('ready', () => {
      let parent = this;
      this.setState({offOn: `${this.ipfs.isOnline() ? 'flash_on' : 'flash_off'}`})
      this.ipfs.id().then(function(testVal) {parent.setState({nodeStats: `${JSON.stringify(testVal, null, 2)}`})})
      this.ipfs.swarm.peers().then(a => console.log(a))
      if(this.props.urlHash != ''){
        this.setState({uploadComplete: true});
        this.setState({currentHash: this.props.urlHash});
        this.downloadFile(this.props.urlHash);
      }
    })
  }

  captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1e3,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
    this.setState({currentExtension: file.name.split('.').pop()})
    this.setState({currentFileSize: formatBytes(file.size)})
    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }

  saveToIpfs(reader) {
    let t0 = performance.now();
    const buffer = Buffer.from(reader.result)
    this.ipfs.files.add(new this.ipfs.types.Buffer(buffer))
      .then(i => i.pop().hash)
      .then(hash => {
        this.setState({currentHash: hash})
        this.setState({gatewayLink: `localhost:3000/${hash}`})
        return this.ipfs.files.cat(hash)
      })
    let t1 = performance.now();
    this.setState({uploadTime: `${Math.round(t1-t0)} milliseconds.`})
    this.setState({uploadComplete: true})
  }

  uploadStatus() {
    if(this.state.uploadComplete == true) {
      console.log('true');

    } else {
      console.log('false');
    }
  }

  createFileBlob(data, multihash) {
  let parent = this;
  const file = new window.Blob(data, {type: 'application/octet-binary'})
  const fileUrl = window.URL.createObjectURL(file)
  const listItem = document.createElement('div')
  const link = document.createElement('a')

  var fileReader = new FileReader();
  fileReader.onloadend = function(e) {
    var getFileType = new Uint8Array(e.target.result);
    console.log(fileType(getFileType));
    let fileInfo = fileType(getFileType);
    let fileExt = '.';
    try {
      fileExt += fileInfo.ext;
    } catch(err) {
      fileExt = '';
    }
    console.log(fileExt)
    function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1e3,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
    parent.setState({currentExtension: fileExt.substr(1)})
    parent.setState({currentFileSize: formatBytes(file.size)})
    parent.setState({UorD: 'file_download'})
    link.setAttribute('href', fileUrl)
    link.setAttribute('download', multihash + fileExt)
    //const date = (new Date()).toLocaleTimeString()
    //file.size
    link.innerText = multihash + fileExt
    link.click()
  };
  fileReader.readAsArrayBuffer(file);
  listItem.appendChild(link)
  return listItem
}

  downloadFile(currentHash) {
    event.preventDefault();
    console.log(currentHash)
    this.setState({downloadStarted: true});
    this.getFile(currentHash)
  }

  getFile(hash) {
  let t0 = performance.now();
  const multihash = hash

  if (!multihash) {
    return console.log('no multihash was inserted')
  }

  // files.get documentation
  // https://github.com/ipfs/interface-ipfs-core/tree/master/API/files#get
  this.ipfs.files.get(multihash, (err, filesStream) => {
    if (err) {
      return onError(err)
    }

    filesStream.on('data', (file) => {
      document.getElementById("downloads").className += " show-downloads";
      //setTimeout(function(){
        //document.getElementById("downloads").className = "col-3";
      //}, 1000);

      if (file.content) {
        const buf = []
        // buffer up all the data in the file
        file.content.on('data', (data) => buf.push(data))

        file.content.once('end', () => {
          const listItem = this.createFileBlob(buf, multihash)
          document.getElementById("History").appendChild(listItem);
        })

        file.content.resume()
      }
    })
    filesStream.resume()

    filesStream.on('end', () => console.log('Every file was fetched for', multihash))
    let t1 = performance.now();
    console.log("Download took " + (t1 - t0) + " milliseconds.")
    this.setState({UorD: 'file_download'})
    this.setState({uploadTime: `${Math.round(t1-t0)} milliseconds.`})
    //document.getElementById("History").innerHTML += `Download took ${(t1 - t0)} milliseconds.`
  })
}

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="col-9 col-s-12 dropzone shadow-bg" id="mainContent">
        <NodeStatus offOn={this.state.offOn} />
        <NodeStats Stats={this.state.nodeStats} />
        {this.props.pageMode == 'upload' && this.state.uploadComplete == false && this.state.downloadStarted == false ? <FileUpload parent={this} /> : ''}
        {this.state.uploadComplete == true && this.props.pageMode == 'upload' || this.state.downloadStarted == true ? <FileView uploadTime={this.state.uploadTime} currentHash={this.state.currentHash} gatewayLink={this.state.gatewayLink} parent={this} currentExtension={this.state.currentExtension} currentFileSize={this.state.currentFileSize} UorD={this.state.UorD} /> : ''}
        {this.props.pageMode == 'download' && this.state.downloadStarted == false ? <FileDownload parent={this} /> : ''}
        {this.props.pageMode == 'sync' ? 'Nothing is here yet.' : ''}
      </div>
    )
  }
}
module.exports = Core
