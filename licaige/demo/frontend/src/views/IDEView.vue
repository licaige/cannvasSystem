<template>
  <el-container class="top-container">

    <el-header>
      <el-row justify="space-between" align="middle" style="height: 100%;">
        <span>
          <el-button text @click="openHomePage">
            <img class="home-icon" src="../assets/home.png" />
          </el-button>
        </span>
        <span>
          <el-button text @click="beginRunner">
            <img class="utils-icon" src="../assets/run.png" />
          </el-button>
          <el-button text @click="beginDebug">
            <img class="utils-icon" src="../assets/debug.png" />
          </el-button>
          <el-button text @click="configDialogVisible = true" style="margin-left: 4px;">
            <img class="utils-icon" src="../assets/config.png" />
          </el-button>
        </span>
      </el-row>
    </el-header>

    <el-container>

      <el-aside width="300px">
        <el-row justify="space-between" style="padding-right: 4px;height: 38px;">
          <span class="fs-title">
            文件资源管理器
          </span>
          <el-space :size="0">
            <el-button text @click="getFileSystemData">
              <img class="file-utils-icon" src="../assets/refresh.png" />
            </el-button>

            <el-popover placement="top-start" :width="250" v-model:visible="newFilePopoverVisible">
              <template #reference>
                <el-button text>
                  <img class="file-utils-icon" src="../assets/new-file.png" />
                </el-button>
              </template>
              <template #default>
                <el-input v-model="newFilename" placeholder="请输入新文件名"
                  @keyup.enter="EnterKeyWrapper(createNewFile, $event)">
                  <template #append>
                    <el-button type="primary" @click="createNewFile">
                      创建
                    </el-button>
                  </template>
                </el-input>
              </template>
            </el-popover>

            <el-popover placement="top-start" :width="250" v-model:visible="newFolderPopoverVisible">
              <template #reference>
                <el-button text>
                  <img class="file-utils-icon" src="../assets/new-folder.png" />
                </el-button>
              </template>
              <template #default>
                <el-input v-model="newFoldername" placeholder="请输入新文件夹名称"
                  @keyup.enter="EnterKeyWrapper(createNewFolder, $event)">
                  <template #append>
                    <el-button type="primary" @click="createNewFolder">
                      创建
                    </el-button>
                  </template>
                </el-input>
              </template>
            </el-popover>

            <el-button text @click="downloadFolder">
              <img class="file-utils-icon" src="../assets/download.png" />
            </el-button>

            <el-upload v-model:file-list="uploadFileList" :http-request="uploadFileXHR" :show-file-list="false">
              <el-button text>
                <img class="file-utils-icon" src="../assets/upload.png" />
              </el-button>
            </el-upload>

          </el-space>
        </el-row>

        <el-divider class="fs-divider"></el-divider>

        <el-tree ref="file-tree" :data="filesData" highlight-current @contextmenu.prevent="" draggable node-key="url"
          @current-change="handleFileTreeCurrentChange">
          <template #default="{ node }">

            <el-popover ref="popover" :width="50" trigger="contextmenu" v-model:visible="node.contextmenuVisible">
              <template #reference>
                <span class="custom-tree-node">
                  <el-image :src="getFileIconUrl(node)" />
                  <span>{{ node.label }}</span>
                </span>
              </template>
              <el-space class="file-contextmenu" :size="0" direction="vertical">

                <el-popover placement="top-end" :width="250" v-model:visible="node.renamePopoverVisible">
                  <template #reference>
                    <el-button text>重命名</el-button>
                  </template>
                  <template #default>
                    <el-input v-model="renameNewName" placeholder="请输入新文件名"
                      @keyup.enter="EnterKeyWrapper(() => { renameFile(node) }, $event)">
                      <template #append>
                        <el-button type="primary" @click="renameFile(node)">
                          重命名
                        </el-button>
                      </template>
                    </el-input>
                  </template>
                </el-popover>

                <el-button text v-if="!node.data.isDir" @click="downloadFile(node)">下载</el-button>

                <el-popconfirm popper-class="el-popover delete-file-popconfirm" style="padding: 0;" title="确定要删除吗？"
                  confirm-button-text="确定" cancel-button-text="取消" icon="WarningFilled"
                  @confirm="deleteFileOrFolder(node)">
                  <template #reference>
                    <el-button text type="danger">删除</el-button>
                  </template>
                </el-popconfirm>

              </el-space>
            </el-popover>

          </template>
        </el-tree>

        <!-- hidden link for download -->
        <el-link ref="download-link" :href="downloadLinkData.href" :download="downloadLinkData.download"></el-link>
      </el-aside>

      <el-container>
        <el-header class="editor-header" height="20px">
          <el-tabs type="card" class="editor-tabs" v-model="nowActiveEditorTabName" closable
            @tab-remove="handleEditorTabRemove" @tab-change="handleEditorTabChange">
            <el-tab-pane v-for="item in editorTabsData" :key="item.url" :label="item.label" :name="item.url">
            </el-tab-pane>
          </el-tabs>
        </el-header>

        <el-main>
          <MonacoEditor ref="editor" id="monaco-editor" v-show="editorTabsData.length !== 0"
            :breakPointList="breakPointList" :lineNumber="debugLineNumber" @new-breakpoint="handleNewBreakPoint"
            @skip="handleDebugSkip" @stop="handleDebugStop" @step="handleDebugStep" @word-hover="debugWordHover" />
          <div class="editor-placeholder" v-show="editorTabsData.length === 0" style="">
            <div>单击左侧文件打开代码编辑器</div>
            <div>单击左上方<img class="file-utils-icon" src="../assets/new-file.png" />图标创建新文件</div>
            <div>单击下方<img class="file-utils-icon" src="../assets/terminal.png" />
              终端打开远程终端</div>

          </div>
        </el-main>

        <el-footer ref="footer" :class="{ 'footer-expanded': footerExpanded }">
          <el-tabs type="card" v-model="nowActiveTab" @tab-click="handleTabClick">
            <el-tab-pane v-for="id in this.termialIDList" :key="id" :name="`term-${id}`">
              <template #label>
                <img class="bottom-shell-icon" src="../assets/terminal.png" />
                终端
              </template>
              <div>
                <div class="xterm-container" :ref="`term-${id}`"></div>
              </div>

            </el-tab-pane>

            <el-tab-pane name="运行">
              <template #label>
                <img class="bottom-shell-icon" src="../assets/run-black.png" />
                运行
              </template>
              <div class="runner-placeholder">
                单击右上角<img class="utils-icon" src="../assets/run.png" />，或按F9运行当前文件
              </div>
              <div id="runner-container"></div>
            </el-tab-pane>
            <el-tab-pane name="调试">
              <template #label>
                <img class="bottom-shell-icon" src="../assets/debug-black.png" />
                调试
              </template>
              <template #default>
                <div style="display: flex">
                  <div class="debugger-placeholder">
                    单击右上角<img class="utils-icon" src="../assets/debug.png" />，或按F10调试当前文件
                  </div>
                  <div id="debug-run-container"></div>
                  <div>
                    <el-input class="debug-var-output" v-model="debugOutputData" type="textarea" readonly resize="none"
                      :rows="7" placeholder="调试时将鼠标移动到变量名上，此处将显示变量信息" />
                    <el-input v-model="debugInputData" placeholder="也可以在此处手动输入，查看表达式的值">
                      <template #append>
                        <el-button type="primary" @click="checkDebugVariable">
                          查看表达式
                        </el-button>
                      </template>
                    </el-input>
                  </div>
                </div>

              </template>

            </el-tab-pane>
          </el-tabs>
          <el-button @click="addTerminal" class="add-terminal-button" icon="Plus"></el-button>
        </el-footer>

      </el-container>
    </el-container>
  </el-container>

  <el-drawer v-model="configDialogVisible" title="项目设置" size="45%">
    <el-tabs tab-position="right">
      <el-tab-pane label="依赖项管理">
        <el-table :data="dependencyData" style="width: 100%">
          <el-table-column prop="package" label="名称" width="180" />
          <el-table-column prop="version" label="版本" width="180" />
          <el-table-column>
            <template #default="scope">
              <el-button @click="deleteDependency(scope.row)" text type="danger">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
              <el-input v-model="dependencyPackage" style="width: 180px" placeholder="依赖名称"></el-input>
              <el-input v-model="dependencyVersion" placeholder="版本，留空为最新版本" style="width: 180px"></el-input>
              <el-button :loading="addDependencyLoading" @click="addDependency" type="primary">添加依赖</el-button>
            </el-row>

      </el-tab-pane>
      <el-tab-pane label="外观设置">
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor.vue'

import * as xterm from 'xterm'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { FitAddon } from 'xterm-addon-fit'
import xtermTheme from 'xterm-theme'

import { io } from 'socket.io-client'

import _ from 'lodash'

export default {
  data () {
    return {
      // project info
      containerid: '',
      projectInfo: {},

      // config data
      configDialogVisible: false,
      dependencyRawData: {},
      dependencyPackage: '',
      dependencyVersion: '',
      addDependencyLoading: false,

      // file system data
      filesData: [],
      fileTreeCurrentFileData: '',
      newFilename: '',
      newFilePopoverVisible: false,
      newFoldername: '',
      newFolderPopoverVisible: false,
      renameNewName: '',
      downloadLinkData: {
        href: '',
        download: ''
      },
      uploadFileList: [],

      // editor
      nowActiveEditorTabName: '',
      editorTabsData: [],
      breakPointRawList: [],
      debugLineNumber: -1,

      // footer
      termialCount: 0,
      termialIDList: [],
      footerExpanded: true,
      nowActiveTab: '终端',
      terminalTabPosition: '',
      debugOutputData: '',
      debugInputData: '',
      showRunnerPlaceholder: true,
      showDebugPlaceholder: false,

      FileTypeIconUrlSet: {
        folder: require('../assets/folder.png'),
        file: require('../assets/file.png'),
        python: require('../assets/python.png'),
        cpp: require('../assets/cpp.png')
      }
    }
  },
  mounted () {
    this.addTerminal()
  },
  components: {
    MonacoEditor
  },
  async created () {
    console.log(this.BASE_URL)
    this.containerid = this.$route.params.containerid
    await Promise.all([this.getContainerData(), this.getFileSystemData()])
    this.getDependencyRawData()

    this.url2TextModel = {}

    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        this.handleCtrlS()
      } else if (e.key === 'F10') {
        e.preventDefault()
        if (this.debugLineNumber !== -1) {
          this.handleDebugStop()
        } else {
          this.beginDebug()
        }
      } else if (e.key === 'F9') {
        e.preventDefault()
        this.beginRunner()
      } else if (e.key === 'F7') {
        e.preventDefault()
        this.handleDebugStep()
      } else if (e.key === 'F6') {
        e.preventDefault()
        this.handleDebugSkip()
      }
    })
    window.addEventListener('beforeunload', () => {
      navigator.sendBeacon(`/api/docker/closeContainer/${this.containerid}/`)
    })
  },
  methods: {
    openHomePage () {
      window.open('/')
    },
    handleOpenTerminal () {
      if (this.footerExpanded === true) {
        this.footerExpanded = false
      } else {
        this.footerExpanded = true
      }
    },
    handleTabClick (pane, event) {
      if (this.footerExpanded === false) {
        this.footerExpanded = true
      } else {
        if (pane.active) {
          this.footerExpanded = false
        }
      }
    },
    getFileIconUrl (node) {
      let filetype = 'file'
      if ('children' in node.data) { // folder
        filetype = 'folder'
      } else if (node.label.endsWith('.py')) {
        filetype = 'python'
      } else if (node.label.endsWith('.cpp')) {
        filetype = 'cpp'
      }
      return this.FileTypeIconUrlSet[filetype]
    },
    initXtermTerimial (
      domElement,
      socket,
      emitEvent = 'message',
      onEvent = 'response'
    ) {
      const term = new xterm.Terminal({
        theme: xtermTheme.Ryuuko
      })
      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      term.open(domElement)
      fitAddon.fit()

      term.onData(chunk => {
        socket.emit(emitEvent, chunk)
      })

      socket.on(onEvent, (data) => {
        term.write(data)
      })

      return term
    },
    addTerminal () {
      this.termialCount += 1
      const termialID = this.termialCount
      this.termialIDList.push(termialID)
      this.nowActiveTab = `term-${termialID}`

      setTimeout(() => {
        const socket = io(this.BASE_URL + '/xterm')
        const termDom = this.$refs[`term-${termialID}`][0]
        console.log(this.$refs, termDom)
        const term = this.initXtermTerimial(
          termDom,
          socket
        )
        socket.emit('start', this.containerid)
        socket.on('end', () => {
          term.dispose()
          const index = this.termialIDList.indexOf(termialID)
          this.termialIDList.splice(index, 1)
          if (this.termialIDList.length > 0) {
            this.nowActiveTab = `term-${this.termialIDList[0]}`
          } else {
            this.nowActiveTab = '调试'
          }
        })
      }, 0)
    },
    transferRawFilesData (rawData, prefix) {
      const result = []
      for (const [label, childData] of Object.entries(rawData)) {
        const fileObject = {
          label: label,
          url: prefix + label,
          isDir: false,
          contextmenuVisible: false,
          renamePopoverVisible: false
        }
        if (childData !== '') {
          fileObject.isDir = true
          fileObject.children = this.transferRawFilesData(childData, prefix + label + '/')
        }
        result.push(fileObject)
      }
      // folder go first.
      result.sort((a, b) =>
        (('children' in b) - ('children' in a)))
      return result
    },
    getContainerData () {
      return this.$axios.get(`/api/database/getProject/${this.containerid}`)
        .then((response) => {
          this.projectInfo = response.data
        })
    },
    getFileSystemData () {
      return this.$axios.get(`/api/docker/getdir/${this.containerid}`)
        .then((response) => {
          const newFilesData = this.transferRawFilesData(response.data, './')
          if (!_.isEqual(this.filesData, newFilesData)) {
            this.filesData = newFilesData
          }
        })
    },
    getDependencyRawData () {
      const language = this.projectInfo.language
      let url = ''
      if (language === 'Python') {
        url = `/api/docker/getPipList/${this.containerid}`
      } else if (language === 'node') {
        url = `/api/docker/getNodejsList/${this.containerid}`
      }
      if (url === '') {
        console.log('C/C++不支持依赖管理')
        return
      }
      return this.$axios.get(url)
        .then((response) => {
          this.dependencyRawData = response.data
          console.log('dependencyRawData', this.dependencyRawData)
        })
    },
    async handleFileTreeCurrentChange (nodeData, node) {
      this.fileTreeCurrentFileData = nodeData

      // add / switch to new file
      if (!nodeData.isDir) {
        if (!this.editorTabsData.find(
          tabData => (tabData.url === nodeData.url)
        )) {
          // open new tab
          const text = await this.$axios.post('/api/docker/downloadContent/', {
            containerid: this.containerid,
            dir: this.currentDir,
            filename: nodeData.label
          }, {
            transformResponse: x => x
          }).then(response => response.data.toString())
          this.url2TextModel[nodeData.url] =
            this.$refs.editor.createTextModel(text, nodeData.label)
          this.editorTabsData.push(nodeData)
        }
        this.nowActiveEditorTabName = nodeData.url
      }
    },
    createNewFile () {
      this.$axios.post('/api/docker/createFile/', {
        dir: this.currentDir,
        filename: this.newFilename,
        containerid: this.containerid
      }).finally(() => {
        this.newFilename = ''
        this.getFileSystemData()
        this.newFilePopoverVisible = false
      })
    },
    createNewFolder () {
      this.$axios.post('/api/docker/createFolder/', {
        dir: this.currentDir + '/' + this.newFoldername,
        containerid: this.containerid
      }).finally(() => {
        this.newFoldername = ''
        this.getFileSystemData()
        this.newFilePopoverVisible = false
      })
    },
    downloadFile (node) {
      const dir = node.data.url
        .split('/').slice(0, -1).join('/')
      this.downloadLinkData.href = `/api/docker/downloadFile/?dir=${dir}&containerid=${this.containerid}&filename=${node.label}`
      this.downloadLinkData.download = node.label

      setTimeout(() => {
        this.$message.success('开始下载')
        this.$refs['download-link'].$el.click()
        node.contextmenuVisible = false
      }, 0)
    },
    downloadFolder () {
      this.downloadLinkData.href = `/api/docker/downloadFolder/?dir=.&containerid=${this.containerid}`
      this.downloadLinkData.download = 'project.tar'

      setTimeout(() => {
        this.$message.success('开始下载')
        this.$refs['download-link'].$el.click()
      }, 0)
    },
    deleteFileOrFolder (node) {
      let deleteTask
      if (node.data.isDir) {
        const dir = node.data.url
        deleteTask = this.$axios.delete('/api/docker/deleteFolder/', {
          data: {
            dir: dir,
            containerid: this.containerid
          }
        })
      } else {
        const dir = node.data.url
          .split('/').slice(0, -1).join('/')
        deleteTask = this.$axios.delete('/api/docker/deleteFile/', {
          data: {
            dir: dir,
            filename: node.label,
            containerid: this.containerid
          }
        })
      }
      deleteTask.finally(() => {
        this.getFileSystemData()
      })
    },
    renameFile (node) {
      const dir = node.data.url
        .split('/').slice(0, -1).join('/')
      this.$axios.post('/api/docker/renameFile/', {
        dir: dir,
        filename: node.label,
        newname: this.renameNewName,
        containerid: this.containerid
      }).finally(() => {
        node.renamePopoverVisible = false
        node.contextmenuVisible = false
        this.getFileSystemData()
      })
    },
    uploadFileXHR (options) {
      const formData = new FormData()
      formData.append('file', options.file)
      formData.append('dir', this.currentDir)
      formData.append('containerid', this.containerid)

      this.$axios.post('/api/docker/uploadFile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        this.getFileSystemData()
      })
    },
    EnterKeyWrapper (func, event) {
      console.log(func, event)
      func()
    },
    async handleEditorTabRemove (tabName) {
      const IsRemoveNowActive = tabName === this.nowActiveEditorTabName
      this.editorTabsData = this.editorTabsData
        .filter(tabData => (tabData.url !== tabName))

      // save content to server when tab close
      await this.saveFileToServer(tabName)

      if (IsRemoveNowActive) {
        if (this.editorTabsData.length !== 0) {
          this.nowActiveEditorTabName = this.editorTabsData[0].url
          this.$refs.editor.changeModel(this.url2TextModel[this.nowActiveEditorTabName])
        } else {
          this.nowActiveEditorTabName = ''
        }
      }

      // destory text model
      const textModel = this.url2TextModel[tabName]
      textModel.dispose()
    },
    async saveFileToServer (url) {
      const textModel = this.url2TextModel[url]
      await this.$axios.post('/api/docker/uploadContent/', {
        containerid: this.containerid,
        dir: url.split('/').slice(0, -1).join('/'),
        filename: url.split('/').slice(-1)[0],
        content: textModel.getValue()
      }).then(() => {
        this.$message.success(`${url}：已保存`)
      })
    },
    handleEditorTabChange (tabName) {
      this.$refs['file-tree'].setCurrentKey(tabName)
      this.$refs.editor.changeModel(this.url2TextModel[tabName])
    },
    handleCtrlS () {
      this.saveFileToServer(this.nowActiveEditorTabName)
    },
    handleNewBreakPoint (lineNumber) {
      let index = -1
      this.breakPointRawList
        .forEach(([fileurl, lineNumber_], index_) => {
          if (fileurl === this.nowActiveEditorTabName &&
          lineNumber === lineNumber_) {
            index = index_
          }
        })
      // const index = this.breakPointRawList.indexOf(lineNumber)
      if (index !== -1) {
        // delete break point
        if (this.debugLineNumber !== -1) {
          this.debugSocket.emit('delete', [this.nowActiveEditorTabName, lineNumber])
        } else {
          this.breakPointRawList.splice(index, 1)
        }
      } else {
        // add break point
        if (this.debugLineNumber !== -1) {
          this.debugSocket.emit('add', [this.nowActiveEditorTabName, lineNumber])
        } else {
          this.breakPointRawList.push([this.nowActiveEditorTabName, lineNumber])
        }
      }
    },
    beginDebug () {
      const supportLanguageList = ['Python', 'C/C++']
      if (!supportLanguageList.includes(this.projectInfo.language)) {
        this.$message.info('当前语言不支持调试功能')
        return
      }

      this.footerExpanded = true
      this.nowActiveTab = '调试'
      setTimeout(() => {
        let url = ''
        if (this.projectInfo.language === 'Python') {
          url = '/pdb'
        } else if (this.projectInfo.language === 'C/C++') {
          url = '/gdb'
        }
        const debugSocket = io(this.BASE_URL + url)
        this.debugSocket = debugSocket

        debugSocket.on('response', (response) => {
          console.log(response)
          if (response.lineno[0] !== '.run.py' && response.lineno[0] !== './.run') {
            this.nowActiveEditorTabName = response.lineno[0]
          }
          setTimeout(() => {
            this.debugLineNumber = response.lineno[1]
            this.breakPointRawList = response.bp
            if (response.message !== '') {
              const data = response.message[0]
              this.debugOutputData += `${data}\n`
            }
          }, 0)
        })
        debugSocket.on('initFinished', () => {
          const breakPointRawList = this.breakPointRawList
          this.debugLineNumber = 0
          debugSocket.emit('addList', breakPointRawList)
        })
        debugSocket.on('addListFinished', () => {
          debugSocket.emit('skip')
        })
        debugSocket.on('disconnect', () => {
          this.debugLineNumber = -1
        })

        const term = this.initXtermTerimial(
          document.getElementById('debug-run-container'),
          debugSocket,
          'stdin',
          'stdout'
        )
        debugSocket.on('end', () => {
          this.debugLineNumber = -1
          term.onKey(() => term.dispose())
          term.write('\n按任意键退出')
        })

        debugSocket.emit('start', this.containerid, this.nowActiveEditorTabName)
      }, 0)
    },
    handleDebugSkip () {
      this.debugSocket.emit('skip')
    },
    handleDebugStop () {
      this.debugSocket.emit('exit')
    },
    handleDebugStep () {
      this.debugSocket.emit('next')
    },
    checkDebugVariable () {
      if (this.debugLineNumber !== -1) {
        this.debugSocket.emit('check', [this.debugInputData])
      }
    },
    debugWordHover (word) {
      if (this.debugLineNumber !== -1) {
        this.debugSocket.emit('check', [word])
      }
    },
    beginRunner () {
      const supportLanguageList = ['Python', 'C/C++', 'node']
      if (!supportLanguageList.includes(this.projectInfo.language)) {
        this.$message.info('当前语言不支持运行功能')
        return
      }

      this.footerExpanded = true
      this.nowActiveTab = '运行'
      const runnerSocket = io(this.BASE_URL + '/runner')
      const term = this.initXtermTerimial(
        document.getElementById('runner-container'),
        runnerSocket
      )
      runnerSocket.emit(
        'start',
        this.containerid,
        this.projectInfo.language,
        this.nowActiveEditorTabName
      )
      runnerSocket.on('end', () => {
        term.onKey(() => term.dispose())
        term.write('\n按任意键退出')
      })
    },
    addDependency () {
      const language = this.projectInfo.language
      let url = ''
      if (language === 'Python') {
        url = '/api/docker/addPythonPackage/'
      } else {
        url = '/api/docker/addNodejsPackage/'
      }
      this.addDependencyLoading = true
      this.$axios.post(url, {
        containerid: this.containerid,
        package: this.dependencyPackage,
        version: this.dependencyVersion
      }).then(() => {
        this.getDependencyRawData()
        this.dependencyPackage = ''
        this.dependencyVersion = ''
        this.addDependencyLoading = false
      })
    },
    deleteDependency (rowData) {
      const language = this.projectInfo.language
      let url = ''
      if (language === 'Python') {
        url = '/api/docker/deletePythonPackage/'
      } else {
        url = '/api/docker/deleteNodejsPackage/'
      }
      this.$axios.delete(url, {
        data: {
          containerid: this.containerid,
          package: rowData.package
        }
      }).then(() => {
        this.getDependencyRawData()
      })
    }
  },
  computed: {
    currentDir () {
      if (this.fileTreeCurrentFileData === '') {
        return '.'
      } else {
        if (this.fileTreeCurrentFileData.isDir) { return this.fileTreeCurrentFileData.url } else {
          return this.fileTreeCurrentFileData.url
            .split('/').slice(0, -1).join('/')
        }
      }
    },
    dependencyData () {
      return Object.entries(this.dependencyRawData)
        .map(([pkg, version]) => ({
          package: pkg,
          version: version
        }))
    },
    breakPointList () {
      return this.breakPointRawList
        .filter(([fileUrl, lineNumber]) => (fileUrl === this.nowActiveEditorTabName))
        .map(([fileUrl, lineNumber]) => lineNumber)
    }
  },
  watch: {
    nowActiveEditorTabName (newValue) {
      this.$refs.editor.renderDecorations()
    }
  }
}
</script>

<style scoped>
.top-container {
  height: 100vh;
  box-sizing: border-box;
  letter-spacing: 1px;
  background: #FAFAFA;
}

.el-aside,
.el-footer,
.el-header,
.el-main {
  border: 1px solid var(--el-border-color);
  margin: 0;
  box-sizing: border-box;
}

.el-header {
  height: 50px;
}

.el-main {
  padding: 0;
}

.el-button.is-text {
  margin: 0;
  padding-left: 4px;
  padding-right: 4px;
}

.project-title {
  display: inline;
  margin-left: 4px;

  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  font-size: 24px;
  letter-spacing: 2px;
  color: #606266;
}

.home-icon {
  width: 24px;
  vertical-align: -4px;
  margin-right: 4px;
}

.utils-icon {
  width: 24px;
}

.utils-divider {
  vertical-align: 4px;
  margin-left: 12px;
}

.fs-divider {
  margin: 2px 0;
}

.fs-title {
  text-align: left;
  padding-top: 8px;
  padding-left: 12px;
  margin: 0;
  letter-spacing: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.el-tree {
  background: #FAFAFA;
  letter-spacing: 0;
  font-size: 14px;
  font-family: monospace;
}

.el-footer {
  position: relative;
  padding: 0;
  text-align: left;
  height: 36px;
  overflow: hidden;
}

.add-terminal-button {
  position: absolute;
  padding: 8px 10px;
  z-index: 1;
  top: 4px;
  right: 4px;
}

.footer-expanded {
  height: 264px;
}

.bottom-shell-container {
  height: 100%;
}

.bottom-shell-icon {
  width: 16px;
  margin-right: 4px;
}

.xterm-container {
  height: 230px;
  width: 100%;

  text-align: left;
  letter-spacing: 0;
  font-size: 12px;
}

.editor-tabs {
  border: none;
}

.editor-header {
  padding: 0;
  height: 41px;
}

.custom-tree-node {
  width: 100%;
  text-align: left;
}

.custom-tree-node>.el-image {
  height: 16px;
  margin-right: 4px;
}

.file-utils-icon {
  height: 20px;
}

.el-textarea,
.el-input {
  --el-input-border-radius: none;
}

.editor-placeholder {
  height: 100%;
  width: 100%;
  padding-top: 80px;
  box-sizing: border-box;

  color: #909399;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  font-size: 24px;
  letter-spacing: 4px;
}

.editor-placeholder>div {
  margin-top: 20px;
}

.debugger-placeholder {
  position: absolute;
  height: 230px;
  width: 60%;
  text-align: center;
  margin-top: 80px;

  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  letter-spacing: 2px;
}

#debug-run-container {
  height: 230px;
  width: 60%;

  z-index: 1;
  opacity: 1;
}

.debug-var-output {
  width: 100%;
  font-size: 17px;
  font-family: 'Courier New', Courier, monospace;
}

.runner-placeholder {
  position: absolute;
  height: 230px;
  width: 100%;
  text-align: center;
  margin-top: 80px;

  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  letter-spacing: 2px;
}

#runner-container {
  height: 230px;
  width: 100%;

  z-index: 1;
  opacity: 1;
}
</style>

<!-- no scoped part -->
<style>
.el-tabs__header {
  margin: 0;
}

.editor-tabs .el-tabs__header {
  border-bottom: 0;
}

.el-popover.el-popper {
  padding: 0;
}

.delete-file-popconfirm.el-popover.el-popper {
  padding: 12px;
}

.file-contextmenu,
.file-contextmenu>.el-space__item,
.file-contextmenu>.el-button {
  width: 100%;
}

.el-radio-button {
  border-radius: 0;
}

.el-tabs--right .el-tabs__header.is-right {
  margin-left: 0;
}

.xterm-viewport {
  width: initial !important;
}

.xterm-terminal {
  position: absolute;
  height: 230px;
  width: 100%;
}

.xterm-terminal.show {
  z-index: 1;
}
</style>
