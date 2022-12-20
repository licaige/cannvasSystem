<template>
  <div class="editor">
    <div ref="container" id="container"></div>
    <el-space v-show="isDebuging" :size="0" class="debug-button-container">
      <el-button text @click="$emit('skip')">
        <img class="debug-icon" src="../assets/skip.png" />
      </el-button>
      <el-button text @click="$emit('step')">
        <img class="debug-icon" src="../assets/step-over.png" />
      </el-button>
      <el-button text @click="$emit('stop')">
        <img class="debug-icon" src="../assets/stop.png" />
      </el-button>
    </el-space>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { WebSocketMessageReader, WebSocketMessageWriter } from 'vscode-ws-jsonrpc'
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices
} from 'monaco-languageclient'
import { io } from 'socket.io-client'
import themeData from 'monaco-themes/themes/LAZY.json'

export default {
  name: 'MonacoEditor',
  props: {
    breakPointList: Array,
    lineNumber: Number
  },
  data () {
    return {
    }
  },
  computed: {
    decorationOptionList () {
      // break point
      const res = this.breakPointList.map(
        lineNumber => ({
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            glyphMarginClassName: 'breakPoint'
          }
        })
      )

      // debug line
      if (this.lineNumber > 0) {
        res.push({
          range: new monaco.Range(this.lineNumber, 1, this.lineNumber, 1),
          options: {
            isWholeLine: true,
            className: 'debugNowLine'
          }
        })
      }

      return res
    },
    isDebuging () {
      return this.lineNumber !== -1
    }
  },
  watch: {
    decorationOptionList (newValue) {
      this.decorations = this.editor.deltaDecorations(
        this.decorations,
        newValue
      )
    }
  },
  mounted () {
    monaco.languages.registerHoverProvider('python', {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position).word
        this.$emit('wordHover', word)
      }
    })
    monaco.editor.defineTheme('mytheme', themeData)
    const editor = monaco.editor.create(document.getElementById('container'), {
      glyphMargin: true,
      lightbulb: {
        enabled: true
      },
      automaticLayout: true,
      minimap: {
        enabled: false
      },
      theme: 'mytheme'
    })
    this.editor = editor

    MonacoServices.install(editor)
    this.socketioList = []
    this.decorations = []
    this.installLanguageServer('python')
    this.installLanguageServer('cpp')

    editor.onMouseDown(({ event, target }) => {
      if (event.leftButton) {
        this.mouseDownHtmlElement = target.element
      } else {
        this.mouseDownHtmlElement = ''
      }
    })
    editor.onMouseUp(({ event, target }) => {
      if (
        event.leftButton &&
        target.element === this.mouseDownHtmlElement &&
        (target.type === 2 || target.type === 3)
      ) {
        this.$emit('newBreakpoint', target.position.lineNumber)
      }

      // if (this.mouseDownTarget == event.target)
    })
  },
  created () {
    window.addEventListener('beforeunload', () => {
      this.socketioList.forEach(socketio => {
        socketio.disconnect()
      })
    })
  },
  methods: {
    createTextModel (text, filename) {
      return monaco.editor.createModel(
        text,
        undefined,
        monaco.Uri.file(filename)
      )
    },
    renderDecorations () {
      this.decorations = this.editor.deltaDecorations(
        this.decorations,
        this.decorationOptionList
      )
    },
    changeModel (textModel) {
      this.editor.setModel(textModel)
    },
    installLanguageServer (language) {
      const socketio = io(`${this.BASE_URL}/${language}`)
      this.socketioList.push(socketio)
      socketio.on('connect', () => {
        const socket = socketioToSocketJsonPRC(socketio)
        const reader = new WebSocketMessageReader(socket)
        const writer = new WebSocketMessageWriter(socket)
        const languageClient = createLanguageClient({
          reader,
          writer
        })
        languageClient.start()
        reader.onClose(() => languageClient.stop())
      })

      function createLanguageClient (transports) {
        return new MonacoLanguageClient({
          name: language,
          clientOptions: {
            // use a language id as a document selector
            documentSelector: [language],
            // disable the default error handler
            errorHandler: {
              error: () => ({ action: ErrorAction.Continue }),
              closed: () => ({ action: CloseAction.DoNotRestart })
            }
          },
          // create a language client connection from the JSON RPC connection on demand
          connectionProvider: {
            get: () => {
              return Promise.resolve(transports)
            }
          }
        })
      }

      function socketioToSocketJsonPRC (socketio) {
        return {
          send: content => socketio.emit('receive', content),
          onMessage: cb => {
            socketio.on('send', msg => {
              cb(msg)
            })
          },
          onError: cb => {
            socketio.on('connect_error', event => {
              if ('message' in event) {
                cb(event.message)
              }
            })
          },
          onClose: cb => {
            socketio.on('disconnect', event => cb(event.code, event.reason))
          },
          dispose: () => {
            socketio.disconnect()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.editor {
  position: relative;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  letter-spacing: 0;
}

#container {
  height: 100%;
  width: 100%;
  text-align: left;
}

.debug-button-container {
  position: absolute;
  top: 4px;
  left: calc(50% - 64px);
  height: 28px;
  padding: 4px;

  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.debug-button-container .el-button.is-text {
  padding: 8px 8px;
}

.debug-icon {
  height: 20px;
}
</style>

<style>
.debugNowLine {
  background: lightskyblue;
}

.breakPoint {
  background: red;
  border-radius: 50%;

  transform: scale(0.45) translate(25px, -1px)
}
</style>
