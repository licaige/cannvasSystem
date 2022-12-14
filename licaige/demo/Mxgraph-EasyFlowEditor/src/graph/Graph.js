import mxgraph from './index';
import _ from 'lodash';

const {
  mxGraph,
  mxVertexHandler,
  mxConstants,
  mxCellState,
  mxPerimeter,
  mxCellEditor,
  mxGraphHandler,
  mxEvent,
  mxEdgeHandler,
  mxShape,
  mxConnectionConstraint,
  mxPoint,
  mxEventObject,
  mxCodec,
  mxObjectCodec,
  mxUtils,
  mxImageExport,
  mxXmlCanvas2D,
  mxCodecRegistry,
} = mxgraph;

Object.assign(mxEvent, {
  EDGE_START_MOVE: 'edgeStartMove',
  VERTEX_START_MOVE: 'vertexStartMove',
});

let pokeElementIdSeed = 0;

// export class PokeElement {
//   constructor(element) {
//     this.id = pokeElementIdSeed;
//     pokeElementIdSeed++;
//     this.element = element;
//     this.normalType = '';
//   }
// }

export class Graph extends mxGraph {
  static getStyleDict (cell) {
    return _.compact(cell.getStyle().split(';'))
      .reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
      }, {});
  }

  static convertStyleToString (styleDict) {
    const style = Object.entries(styleDict)
      .map(([key, value]) => `${key}=${value}`)
      .join(';')
      .replace(/=undefined/g, '');
    return `${style};`;
  }

  static getCellPosition (cell) {
    return _.pick(cell.getGeometry(), ['x', 'y']);
  }

  constructor(container) {
    super(container);
    this._init();
  }

  _init () {
    this._setDefaultConfig();
    this._configConstituent();
    this._putVertexStyle();
    this._setDefaultEdgeStyle();
    this._setAnchors();
    this._configCustomEvent();
    // this._configCoder();
  }

  _configConstituent () {
    // Redirects selection to parent
    this.selectCellForEvent = (...args) => {
      const [cell] = args;
      if (this.isPart(cell)) {
        args[0] = this.model.getParent(cell);
        mxGraph.prototype.selectCellForEvent.call(this, args);
        return;
      }

      mxGraph.prototype.selectCellForEvent.apply(this, args);
    };

    /**
     * Redirects start drag to parent.
     */
    const graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
    mxGraphHandler.prototype.getInitialCellForEvent = function getInitialCellForEvent (...args) {
      // this ??? mxGraphHandler
      let cell = graphHandlerGetInitialCellForEvent.apply(this, args);
      if (this.graph.isPart(cell)) {
        cell = this.graph.getModel().getParent(cell);
      }

      return cell;
    };
  }

  _setDefaultConfig () {
    this.setConnectable(true);
    mxEvent.disableContextMenu(this.container);

    // ??????????????????
    this.setCellsResizable(false);

    // ???????????????????????????????????????????????????
    this.setEnterStopsCellEditing(true);
    // ???????????? escape ???????????????
    mxCellEditor.prototype.escapeCancelsEditing = false;
    // ?????????????????????
    mxCellEditor.prototype.blurEnabled = true;

    // ??????????????????
    this.foldingEnabled = false;
    // ???????????????????????????????????????
    this.setHtmlLabels(true);

    // ?????????????????????
    mxGraphHandler.prototype.guidesEnabled = true;

    // ??????????????????
    this.setDisconnectOnMove(false);
    this.setAllowDanglingEdges(false);
    mxGraph.prototype.isCellMovable = cell => !cell.edge;

    // ???????????????????????????
    this.setCellsBendable(false);

    // ????????????label??????????????????
    mxGraph.prototype.edgeLabelsMovable = false;
  }

  _putVertexStyle () {
    // const normalTypeStyle = {
    //   [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_IMAGE,
    //   [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
    // };
    // this.getStylesheet().putCellStyle('normalType', normalTypeStyle);

    // const nodeStyle = {
    //   // ??????????????????????????????
    //   // https://github.com/jinzhanye/mxgraph-demos/blob/master/src/06.image.html
    //   [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
    //   [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
    //   [mxConstants.STYLE_ROUNDED]: true,
    //   [mxConstants.STYLE_ARCSIZE]: 6, // ??????????????????

    //   [mxConstants.STYLE_STROKECOLOR]: '#333333',
    //   [mxConstants.STYLE_FONTCOLOR]: '#333333',
    //   [mxConstants.STYLE_FILLCOLOR]: '#ffffff',
    //   //
    //   [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: 'none',

    //   [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
    //   [mxConstants.STYLE_VERTICAL_ALIGN]: mxConstants.ALIGN_TOP,
    //   [mxConstants.STYLE_IMAGE_ALIGN]: mxConstants.ALIGN_CENTER,
    //   [mxConstants.STYLE_IMAGE_VERTICAL_ALIGN]: mxConstants.ALIGN_TOP,

    //   [mxConstants.STYLE_IMAGE_WIDTH]: '72',
    //   [mxConstants.STYLE_IMAGE_HEIGHT]: '72',
    //   [mxConstants.STYLE_SPACING_TOP]: '100',
    //   [mxConstants.STYLE_SPACING]: '8',
    // };
    // this.getStylesheet().putCellStyle('node', nodeStyle);



    // ????????????????????????????????????????????????????????????
    const oldCreateSelectionShape = mxVertexHandler.prototype.createSelectionShape;
    mxVertexHandler.prototype.createSelectionShape = function createSelectionShape (...args) {
      const res = oldCreateSelectionShape.apply(this, args);
      res.isRounded = true;
      // style ???????????? mxShape , mxRectangle ????????? mxShape
      res.style = {
        arcSize: 6,
      };
      return res;
    };
  }

  _setDefaultEdgeStyle () {
    const style = this.getStylesheet().getDefaultEdgeStyle();
    Object.assign(style, {
      [mxConstants.STYLE_ROUNDED]: true, // ??????????????????????????????
      [mxConstants.STYLE_STROKEWIDTH]: '2',
      [mxConstants.STYLE_STROKECOLOR]: '#333333',
      [mxConstants.STYLE_EDGE]: mxConstants.EDGESTYLE_ORTHOGONAL,
      [mxConstants.STYLE_FONTCOLOR]: '#33333',
      [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#ffa94d',
    });
    // ??????????????????????????????????????????????????????
    this.connectionHandler.createEdgeState = () => {
      const edge = this.createEdge();
      return new mxCellState(this.view, edge, this.getCellStyle(edge));
    };
  }

  _setAnchors () {
    // ????????????????????????????????????
    // this.connectionHandler.isConnectableCell = () => false;
    // mxEdgeHandler.prototype.isConnectableCell = () => false;

    // Overridden to define per-shape connection points
    mxGraph.prototype.getAllConnectionConstraints = (terminal) => {
      if (terminal != null && terminal.shape != null) {
        if (terminal.shape.stencil != null) {
          if (terminal.shape.stencil != null) {
            return terminal.shape.stencil.constraints;
          }
        } else if (terminal.shape.constraints != null) {
          return terminal.shape.constraints;
        }
      }

      return null;
    };

    // Defines the default constraints for all shapes
    mxShape.prototype.constraints = [
      new mxConnectionConstraint(new mxPoint(0, 0), true),
      new mxConnectionConstraint(new mxPoint(0, 1), true),
      new mxConnectionConstraint(new mxPoint(1, 0), true),
      new mxConnectionConstraint(new mxPoint(1, 1), true),
      new mxConnectionConstraint(new mxPoint(0.25, 0), true),
      new mxConnectionConstraint(new mxPoint(0.5, 0), true),
      new mxConnectionConstraint(new mxPoint(0.75, 0), true),
      new mxConnectionConstraint(new mxPoint(0, 0.25), true),
      new mxConnectionConstraint(new mxPoint(0, 0.5), true),
      new mxConnectionConstraint(new mxPoint(0, 0.75), true),
      new mxConnectionConstraint(new mxPoint(1, 0.25), true),
      new mxConnectionConstraint(new mxPoint(1, 0.5), true),
      new mxConnectionConstraint(new mxPoint(1, 0.75), true),
      new mxConnectionConstraint(new mxPoint(0.25, 1), true),
      new mxConnectionConstraint(new mxPoint(0.5, 1), true),
      new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
  }

  _configCustomEvent () {
    const graph = this;
    const oldStart = mxEdgeHandler.prototype.start;
    mxEdgeHandler.prototype.start = function start (...args) {
      oldStart.apply(this, args);
      graph.fireEvent(new mxEventObject(mxEvent.EDGE_START_MOVE,
        'edge', this.state.cell,
        'source', this.isSource,
      ));
    };


    const oldCreatePreviewShape = mxGraphHandler.prototype.createPreviewShape;
    mxGraphHandler.prototype.createPreviewShape = function createPreviewShape (...args) {
      graph.fireEvent(new mxEventObject(mxEvent.VERTEX_START_MOVE));
      return oldCreatePreviewShape.apply(this, args);
    };
  }


  _configCoder () {
    const codec = new mxObjectCodec(new PokeElement());

    codec.encode = function (enc, obj) {
      const node = enc.document.createElement('PokeElement');
      mxUtils.setTextContent(node, JSON.stringify(obj));

      return node;
    };

    codec.decode = function (dec, node, into) {
      const obj = JSON.parse(mxUtils.getTextContent(node));
      obj.constructor = PokeElement;

      return obj;
    };

    mxCodecRegistry.register(codec);
  }

  getDom (cell) {
    const state = this.view.getState(cell);
    return state.shape.node;
  }

  setStyle (cell, key, value) {
    const styleDict = Graph.getStyleDict(cell);
    styleDict[key] = value;
    const style = Graph.convertStyleToString(styleDict);
    this.getModel().setStyle(cell, style);
  }

  isPart (cell) {
    const state = this.view.getState(cell);
    const style = (state != null) ? state.style : this.getCellStyle(cell);
    return style.constituent === 1;
  }

  deleteSubtree (cell) {
    const cells = [];
    this.traverse(cell, true, (vertex) => {
      cells.push(vertex);
      return true;
    });
    this.removeCells(cells);
  }


  _restoreModel () {
    Object.values(this.getModel().cells)
      .forEach(cell => {
        if (cell.vertex && cell.data) {
          cell.data = JSON.parse(cell.data);
        }
      });
  }

  // ??? data ??????????????????????????????????????????
  _getExportModel () {
    const model = _.cloneDeep(this.getModel());
    Object.values(model.cells)
      .forEach(cell => {
        if (cell.vertex && cell.data) {
          cell.data = JSON.stringify(cell.data);
        }
      });
    return model;
  }

  importModelXML (xmlTxt) {
    this.getModel().beginUpdate();
    try {
      const doc = mxUtils.parseXml(xmlTxt);
      const root = doc.documentElement;
      const dec = new mxCodec(root.ownerDocument);
      dec.decode(root, this.getModel());
    } finally {
      this.getModel().endUpdate();
    }
    this._restoreModel();
  }

  exportModelXML () {
    const enc = new mxCodec(mxUtils.createXmlDocument());
    const node = enc.encode(this._getExportModel());
    return mxUtils.getPrettyXml(node);
  }

  exportPicXML () {
    const xmlDoc = mxUtils.createXmlDocument();
    const root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);

    const { scale } = this.view;
    // ???????????????????????????0???????????????????????????
    const border = 0;

    const bounds = this.getGraphBounds();
    const xmlCanvas = new mxXmlCanvas2D(root);
    xmlCanvas.translate(
      Math.floor((border / scale - bounds.x) / scale),
      Math.floor((border / scale - bounds.y) / scale),
    );
    xmlCanvas.scale(1);

    const imgExport = new mxImageExport();
    imgExport.drawState(this.getView().getState(this.model.root), xmlCanvas);

    const w = Math.ceil(bounds.width * scale / scale + 2 * border);
    const h = Math.ceil(bounds.height * scale / scale + 2 * border);

    const xml = mxUtils.getPrettyXml(root);

    return {
      xml,
      w,
      h,
    };
  }
}

let graph = {};

export const destroyGraph = () => {
  graph.destroy();
  graph = {};
};

export const genGraph = (container) => {
  graph = new Graph(container);
  return graph;
};

export const getGraph = () => graph;