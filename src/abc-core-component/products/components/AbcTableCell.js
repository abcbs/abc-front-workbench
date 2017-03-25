/**
 * 列表显示方式，上面两个大图，下面三十个小图
 */

import React, { PropTypes } from 'react'
import classNames           from 'classnames'
import hoistStatics from 'hoist-non-react-statics'
import {Modal,Glyphicon,Grid,Row,Col,Thumbnail,
    Image,Button,Media,Checkbox,ButtonToolbar,FormControl,Table} from '../../../abc-bootstrap'


import AbcLabelLimit, {lgLimit} from './ui-limit'

import {AbcTableLargeCell,AbcTableSmallCell} from './AbcTableListGridFrame'
///////////////////////////////////////////////////////////////////////
////////////////////////业务UI////////////////////////////////////////
export class AbcTableCellFunctions extends React.Component{

    render() {
        const {lgObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <ButtonToolbar className="abc-toolbar-xs">
                <Glyphicon glyph="pencil"/>
            </ButtonToolbar>
        )
    }
}

export class AbcTableLargeCellWithToolbar extends AbcTableLargeCell{

    render() {
        const {lgObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <h5><AbcLabelLimit contentText={lgObject.title} limit={lgLimit.title} /></h5>
                    <p>{lgObject.description}</p>
                </div>
                <ButtonToolbar className="abc-toolbar">
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="pencil"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="trash"/></Button>
                </ButtonToolbar>
                <Image
                    className={imageClass||'image-1-1'}
                    src={lgObject.portrait}>
                </Image>
            </div>

        )
    }
}

export class AbcTableLargeCellWithToolbarBottom extends AbcTableLargeCell{

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
                <ButtonToolbar className="abc-toolbar">
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="pencil"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="trash"/></Button>
                </ButtonToolbar>
            </div>

        )
    }
}

export class AbcTableLargeCellToolbar extends AbcTableLargeCell{

    render() {
        const {lgObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <h5><AbcLabelLimit contentText={lgObject.title} limit={lgLimit.title} /></h5>
                </div>
                <ButtonToolbar className="abc-toolbar">
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="pencil"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="trash"/></Button>
                </ButtonToolbar>
                <Image
                    className={imageClass||'image-1-1'}
                    src={lgObject.portrait}>
                </Image>
            </div>

        )
    }
}



export class AbcTableMiddleCell extends AbcTableSmallCell{

    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                        <p>{smObject.description}</p>
                        <p>{smObject.address}</p>
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

export class AbcTableSmallCellImageTop extends AbcTableSmallCell{
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <Image
                    src={smObject.portrait}
                    className={imageClass}
                    alt={smObject.portraitAlt}>
                </Image>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                        <p>{smObject.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export class AbcTableSmallSingleCol extends AbcTableSmallCell{
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <Image
                    src={smObject.portrait}
                    className={imageClass}
                    alt={smObject.portraitAlt}>
                </Image>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                        <div className="cashContent">
                            <p className="inline">{smObject.description}</p>
                            <p className="number-postion"> {smObject.address}</p>
                        </div>
                        <div className="cashContent">
                            <p className="inline">{smObject.price}</p>
                            <p className="number-postion"> {smObject.number}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class AbcTableSmallSingleColToolbar extends AbcTableSmallCell{
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <Image
                    src={smObject.portrait}
                    className={imageClass}
                    alt={smObject.portraitAlt}>
                </Image>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                        <div className="cashContent">
                            <p className="inline">{smObject.description}</p>
                            <p className="number-postion"> {smObject.address}</p>
                        </div>
                    </div>

                </div>

                <ButtonToolbar className="abc-toolbar" style={{minWidth: "100px"}}>
                    <Button className="thumbnail-btn"><Glyphicon glyph="plus"/></Button>
                    <FormControl type="number"
                                 style={{width:"46px",padding:"1px 4px",
                         fontSize:"10px" ,border:"none",textAlign:"center"}}
                                 placeholder="1" />
                    <Button className="thumbnail-btn"><Glyphicon glyph="minus"/></Button>
                </ButtonToolbar>

            </div>
        )
    }
}

export class AbcTableSmallCellWithToolbar extends AbcTableSmallCell{
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                        <p>{smObject.description}</p>
                    </div>
                </div>
                <ButtonToolbar className="abc-toolbar">
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="trash"/></Button>
                </ButtonToolbar>
                <Image
                    src={smObject.portrait}
                    className={imageClass}
                    alt={smObject.portraitAlt}>
                </Image>

            </div>
        )
    }
}

export class AbcTableSmallCellWithBadge extends AbcTableSmallCell{
    static propTypes =
    {
        imageClass:PropTypes.string
    };
    static defaultProps =
    {
        imageClass:"image"
    }
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <ButtonToolbar className="abc-toolbar">
                            <Button className="thumbnail-btn">
                                <Glyphicon glyph="trash"/></Button>
                        </ButtonToolbar>
                        <h5>{smObject.title}</h5>
                        <p>{smObject.description}</p>
                        <p>{smObject.address}</p>
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

export class AbcTableMiddleCellSimple extends AbcTableSmallCell{

    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
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
export class AbcTableSmallCellSimple extends AbcTableMiddleCell{
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
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

export class AbcTableSmallCellToolbar extends AbcTableMiddleCell{
    render() {
        const {smObject,containerClass,contentClass,imageClass,...others}=this.props;
        return (
            <div className={containerClass}>
                <div className={contentClass}>
                    <div>
                        <h5>{smObject.title}</h5>
                    </div>
                </div>
                <ButtonToolbar className="abc-toolbar">
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="save"/></Button>
                    <Button className="thumbnail-btn">
                        <Glyphicon glyph="trash"/></Button>
                </ButtonToolbar>
                <Image
                    src={smObject.portrait}
                    className={imageClass}
                    alt={smObject.portraitAlt}>
                </Image>
            </div>
        )
    }
}