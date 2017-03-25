/**
 * 列表显示方式，上面两个大图，下面三十个小图
 */

import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import hoistStatics from 'hoist-non-react-statics'
import {Modal,Glyphicon,Grid,Row,Col,Thumbnail,
    Image,Button,Media,Checkbox,ButtonToolbar,FormControl,Table} from '../../../abc-bootstrap'

import AbcPanel from '../../../abc-ui/AbcPanel'

import lgShape from './lg-shape';
import smShape from './sm-shape';
import AbcLabelLimit, {lgLimit} from './ui-limit'

///////////////////////////////////////////////////////////////////////
export class AbcTableLargeCell extends React.Component{
    static propTypes =
    {
        lgObject: lgShape.isRequired,
        containerClass: PropTypes.string,
        contentClass: PropTypes.string,
        imageClass: PropTypes.string
    };
    static defaultProps =
    {
        containerClass: "abc-content-lg-top",
        contentClass: "abc-content",
        imageClass: "image-top"
    }
    render() {
        const {lgObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <h5><AbcLabelLimit contentText={lgObject.title} limit={lgLimit.title} /></h5>
                    <p>{lgObject.description}</p>
                </div>
                <Image
                    className={imageClass||'image-1-1'}
                    src={lgObject.portrait}>
                </Image>
            </div>
        )
    }
}

export class AbcTableSmallCell extends React.Component {

    static propTypes =
    {
        smObject: smShape.isRequired,
        containerClass: PropTypes.string,
        contentClass: PropTypes.string,
        imageClass: PropTypes.string
    };
    static defaultProps =
    {
        containerClass: "abc-content-sm",
        contentClass: "abc-content",
        imageClass: "image"
    }

    render() {
        const {smObject, containerClass, contentClass, imageClass, ...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                        <p>{smObject.description}</p>
                    </div>
                </div>
                <Image
                    src={smObject.portrait}
                    className={imageClass}
                    alt={smObject.portraitAlt}>
                </Image>
            </div>
        )
    }
}
//////////////////////////////////////////////////////////////////////
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export  function composeTableLargeCell(option) {
    const containerClassName=option&&option.containerClassName;
    const imageClassName=option&&option.imageClassName;
    return function wrapWithConnect(WrappedComponent) {
        const connectDisplayName = `Container(${getDisplayName(WrappedComponent)})`;

        class Container extends React.Component {
            static propTypes =
            {
                lgObject: lgShape.isRequired,
                containerClass:PropTypes.string,
                contentClass:PropTypes.string,
                imageClass:PropTypes.string
            };

            static defaultProps =
            {
                containerClass:"abc-content-lg-top",
                contentClass:"abc-content",
                imageClass:"image-top"
            };
            render() {
                const {lgObject,containerClass,contentClass,imageClass,...others}=this.props;
                const localContainerDisplayName=containerClassName||containerClass;
                const localImageClassName=imageClassName||imageClass;
                return (
                    <WrappedComponent {...this.props}
                        containerClass={localContainerDisplayName}
                        imageClass={localImageClassName}
                    />
                )
            }
        }//
        Container.displayName = connectDisplayName;
        Container.WrappedComponent = WrappedComponent;

        return hoistStatics(Container, WrappedComponent);
    }
}
//构建小图标时传入业务场景所需的参数，如image的className
export  function composeTableSmallCell(option) {

    const imageClassComponent=option&&option.imageClassName;
    const contentClassComponent=option&&option.contentClassName;
    const containerClassComponent=option&&option.containerClassName;
    return function wrapWithConnect(WrappedComponent) {
        const connectDisplayName = `Container(${getDisplayName(WrappedComponent)})`;
        class Container extends React.Component {
            static propTypes =
            {
                smObject: lgShape.isRequired,
                containerClass:PropTypes.string,
                contentClass:PropTypes.string,
                imageClass:PropTypes.string
            };

            static defaultProps =
            {
                containerClass:"abc-content-sm",
                contentClass:"abc-content",
                imageClass:"image"
            };
            render() {
                const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
                const localImageClass=imageClassComponent||imageClass;
                const localContentClass=contentClassComponent||contentClass;
                const localContainerClass=containerClassComponent||containerClass;

                return (
                    <WrappedComponent  {...this.props}
                        imageClass={localImageClass}
                        containerClass={localContainerClass}
                        contentClass={localContentClass}/>
                )

            }
        }//
        Container.displayName = connectDisplayName;
        Container.WrappedComponent = WrappedComponent;

        return hoistStatics(Container, WrappedComponent);
    }
}

/**
 * React-Bootsrap中的Grid处理，
 * 引入Grid
 */
export class AbcTableGrid extends React.Component{

    static propTypes =
    {
        className: PropTypes.string.isRequired
    };

    static defaultProps =
    {
        className:"container-list-abc"
    };

    render() {
        const {className,children,...others}=this.props;
        return (
            <Grid className={className} {...others}>{
                children
            }
            </Grid>
        )
    }
}

/**
 * 大图默认的TD，默认占两个Col
 */
export class AbcTableLargeTd extends React.Component{

    static propTypes =
    {
        className: PropTypes.string.isRequired,
        colSpan: PropTypes.string.isRequired
    };

    static defaultProps =
    {
        className:"td-1-2",
        colSpan:"2"
    };

    render() {
        const {className,colSpan,children,...others}=this.props;
        return (
            <td className={className} colSpan={colSpan}>{
                children
            }
            </td>
        )
    }
}

/**
 * 左右结构默认占两列
 */
export class AbcTableLargeLeftTd extends React.Component{
    //rowSpan
    static propTypes =
    {
        className: PropTypes.string.isRequired,
        rowSpan: PropTypes.string.isRequired
    };
    static defaultProps =
    {
        className:"td-1-2",
        rowSpan:"2"
    };
    render() {
        const {className,rowSpan,children,...others}=this.props;
        return (
            <td className={className} rowSpan={rowSpan}>{
                children
            }
            </td>
        )
    }

}

/**
 * 小图默认的TD
 */
export class AbcTableSmallTd extends AbcTableLargeTd{
    static defaultProps =
    {
        className:"td-1-2-b",
        colSpan:"0"
    };

}

/**
 * Bootsrap的Col封装
 */
export class AbcListCol extends React.Component{

    static propTypes =
    {
        xs: PropTypes.number.isRequired,
        xp: PropTypes.number.isRequired,
        dt: PropTypes.number.isRequired,
        sm: PropTypes.number.isRequired,
        md: PropTypes.number.isRequired,
        lg: PropTypes.number.isRequired

    };
    //xs={12} xp={6} sm={6} md={6}  lg={4}
    static defaultProps =
    {
        xs: 12,
        xp: 6,
        sm: 6,
        md: 6,
        dt: 4,
        lg: 6
    };

    render() {
        const {xs,xp,sm,md,lg,dt,children,...others}=this.props;
        return (
            <Col xs={xs} xp={xp} sm={sm} md={md} lg={lg} dt={dt}>{
                children
            }
            </Col>
        )
    }
}

/**
 * Table格式的引入
 */
export class AbcTableFrame extends React.Component{

    static propTypes =
    {
        tableFrameClassName: PropTypes.string.isRequired,
        cellspacing: PropTypes.string.isRequired,
        cellPadding: PropTypes.string.isRequired,
        style: PropTypes.object,

    };
    static defaultProps =
    {
        tableFrameClassName:"abc-table",
        cellspacing:"1px",
        cellPadding:"0"

    };
    render() {
        const {tableFrameClassName,cellspacing,cellPadding,children,style,...others}=this.props;
        return (
            <Table className={tableFrameClassName} cellspacing={cellspacing}
                   cellPadding={cellPadding} style={style} {...others}>{
                children
            }
            </Table>
        )
    }
}
/**
 * 以Table方式显示时，表格数据项,此类的输出为上下为Table，上面两个格子，下面三个格子
 * ---------------
 * \      \      \
 * \      \      \
 * \--------------
 * \    \   \    \
 * \    \   \    \
 * ---------------
 */
export class AbcTableRowDefault extends React.Component{

    static propTypes =
    {
        lgObjects: PropTypes.arrayOf(lgShape).isRequired,
        smObjects: PropTypes.arrayOf(smShape).isRequired
    };

    tableLargeCell(){
        return AbcTableLargeCell;
    }
    tableSmallCell(){
        return AbcTableSmallCell;
    }
    buildTableLargeCell(option){
        const TableLargeCell=composeTableLargeCell(option)(this.tableLargeCell());
        return TableLargeCell
    }

    buildTableSmallCell(option){
        return composeTableSmallCell(option)(this.tableSmallCell())
    }

    render() {
        const {lgObjects,smObjects,...others}=this.props;
        const TableLargeCell=this.buildTableLargeCell();
        const TableSmallCell=this.buildTableSmallCell();
        return (
            <AbcListCol>
                <AbcTableFrame>
                    <tr align="center">
                    {lgObjects&&lgObjects.map&&lgObjects.map((lgObject, index) =>
                        <AbcTableLargeTd>
                              <TableLargeCell lgObject={lgObject}
                                key={index} {...others} />
                        </AbcTableLargeTd>
                      )}
                      </tr>
                </AbcTableFrame>
                <AbcTableFrame tableFrameClassName="abc-table-nobuttom">
                    <tr>
                        {smObjects&&smObjects.map&&smObjects.map((smObject, index) =>
                            <AbcTableSmallTd>
                                <TableSmallCell smObject={smObject}
                                                  key={index} {...others}/>
                            </AbcTableSmallTd>
                        )}
                    </tr>
                </AbcTableFrame>
            </AbcListCol>
        )
    }
}

/**
 * 显示为Table的结构，它是List-Grid的入口方法
 */
export class AbcTable extends React.Component{

    static propTypes =
    {
        header : PropTypes.object,
        lgObjects: PropTypes.arrayOf(lgShape).isRequired,
        smObjects: PropTypes.arrayOf(smShape).isRequired
    };
    buildAbcTableGrid(){
        return AbcTableRowDefault;
    }
    render()
    {
        const {header,headerId,headerRef,handleHeaderClick,rowProducts,...others}=this.props;
        const TableRow=this.buildAbcTableGrid();
        const panel=
            ( <AbcPanel  header={header} id={headerId} ref={headerRef} onClick={handleHeaderClick}>
                <AbcTableGrid>
                    {rowProducts&&rowProducts.map&&rowProducts.map((rowProduct, index) =>
                        <TableRow lgObjects={rowProduct.lgObjects}
                                   smObjects={rowProduct.smObjects} {...others}/>
                    )}
                </AbcTableGrid>
            </AbcPanel>)
        return panel;
    }
}

//上面两个下面
export default class AbcTableTop2Bottom3 extends AbcTable
{

}
//content-row-4
export class AbcListRow4 extends React.Component{

    static propTypes =
    {
        header : PropTypes.object,
        smObjects: PropTypes.arrayOf(smShape).isRequired
    };

    render()
    {
        const {header,headerId,headerRef,handleHeaderClick,smProducts,...others}=this.props;
        const smObjects=smProducts
        const panel=
            ( <AbcPanel  header={header} id={headerId} ref={headerRef} onClick={handleHeaderClick}>
                <AbcTableGrid>
                    {smObjects&&smObjects.map&&smObjects.map((smObject, index) =>
                        <AbcListCol xs={3} xp={2} sm={2} md={2}   dt={2}  lg={2}>
                            <AbcTableSmallCell containerClass="abc-content-row-4" imageClass="image"
                                  smObject={smObject} {...others} />
                        </AbcListCol>
                    )}
                </AbcTableGrid>
            </AbcPanel>)
        return panel;
    }
}
//////////////////////////////每行两个,图与文字上下///////////////////////////////////////
//content-row-2
export class AbcListRow2 extends React.Component{

    static propTypes =
    {
        header : PropTypes.object,
        smObjects: PropTypes.arrayOf(smShape).isRequired
    };

    render()
    {
        const {header,headerId,headerRef,handleHeaderClick,smProducts,...others}=this.props;
        const smObjects=smProducts;
        const panel=
            ( <AbcPanel  header={header}  header={header} id={headerId} ref={headerRef} onClick={handleHeaderClick}>
                <AbcTableGrid>
                {smObjects&&smObjects.map&&smObjects.map((smObject, index) =>
                    <AbcListCol xs={4} xp={3} sm={3} md={2}  dt={2} lg={2}>
                        <AbcTableSmallCell containerClass="abc-content-row-4" imageClass="image"
                                           smObject={smObject} {...others} />
                    </AbcListCol>
                )}
                </AbcTableGrid>
            </AbcPanel>)
        return panel;
    }
}