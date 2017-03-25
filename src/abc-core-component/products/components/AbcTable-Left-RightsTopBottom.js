/**
 * 列表显示，左边1列，右边两列，共计两行
 * 以左边一列，右边为上下结构
 */
import React, { PropTypes } from 'react'
import classNames           from 'classnames'


import AbcPanel from '../../../abc-ui/AbcPanel'


import {composeTableLargeCell,composeTableSmallCell,
    AbcTableSmallCell,AbcTableRowDefault,
    AbcTable, AbcTableGrid,AbcListCol,AbcTableLargeTd,AbcTableLargeLeftTd,AbcTableSmallTd,AbcTableFrame,
    AbcTableLargeCell} from './AbcTableListGridFrame'


import {AbcTableSmallCellSimple,
    AbcTableMiddleCell,AbcTableMiddleCellSimple,AbcTableSmallCellImageTop,
    AbcTableSmallSingleCol,AbcTableSmallSingleColToolbar, AbcTableCellFunctions,
    AbcTableLargeCellWithToolbarBottom,AbcTableLargeCellWithToolbar} from './AbcTableCell'

//每行UI,大图中包括Toolbar，小图中为文字
/**
 * 主显示为左右结构，左边一个大格子，右边上面两个下面两个
 */
export class AbcTableLeft1RightsTop2Bottom2Row extends AbcTableRowDefault{
    //propTypes
    static propTypes={
        slicePoint:PropTypes.number.isRequired,
        smImageClassName:PropTypes.string,
        smContentClassName:PropTypes.string
    }
    static defaultProps={
        slicePoint:2,
    }
    buildTableLargeCell(){
        return composeTableLargeCell({containerClassName:"abc-content-lg-h12",imageClassName:"image"})
        (this.tableLargeCell())
    }

    buildTableSmallCell(){
        return composeTableSmallCell({
            imageClassName:this.props.smImageClassName,
            contentClassName:this.props.smContentClassName
        })(this.tableSmallCell())
    }
    tableLargeCell(){
        return AbcTableLargeCell;
    }
    tableSmallCell(){
        return AbcTableSmallCell;
    }
    render() {
        const {lgObjects,smObjects,tableType,slicePoint,...others}=this.props;

        const  TableLargeCell=this.buildTableLargeCell();

        const  smObjectsTop= smObjects.slice(0,slicePoint);
        const  smObjectsBottom=smObjects.slice(slicePoint,smObjects.length);

        const TableSmallCell=this.buildTableSmallCell();
        return (
            <AbcListCol>
                <AbcTableFrame>
                    <tr align="center">
                        {lgObjects&&lgObjects.map&&lgObjects.map((lgObject, index) =>
                            <AbcTableLargeLeftTd>
                                <TableLargeCell lgObject={lgObject}
                                                key={index} {...others}/>
                            </AbcTableLargeLeftTd>
                        )}
                        {smObjectsTop&&smObjectsTop.map&&smObjectsTop.map((smObject, index) =>
                            <AbcTableSmallTd>
                                <TableSmallCell smObject={smObject}
                                                key={index} {...others} />
                            </AbcTableSmallTd>
                        )
                        }

                    </tr>
                    <tr>
                        {smObjectsBottom&&smObjectsBottom.map&&smObjectsBottom.map((smObject, index) =>
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
 * 左边一个，右边上下各两个格子
 * ---------------
 * \      \   \   \
 * \      \   \   \
 * \      \-------
 * \      \   \   \
 * \      \   \   \
 * ---------------
 */
export default class AbcTableLeft1RightsTop2Bottom2 extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop2Bottom2Row;
    }
}
export class AbcTableLeft1RightsTop2Bottom3Row extends AbcTableLeft1RightsTop2Bottom2Row{
    static defaultProps={
        slicePoint:3,
        smImageClassName:"image-fiexed-left",
        smContentClassName:"abc-content-fiexed-left"
    }
}

export class AbcTableLeft1RightsTop2Bottom3 extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop2Bottom3Row;
    }
}

export class AbcTableLeft1RightsTop1Bottom1Row extends AbcTableRowDefault{
    static propTypes={
        lgContainerClassName:PropTypes.string,
        lgImageClassName:PropTypes.string,
        smContainerClassName:PropTypes.string,
        smImageClassName:PropTypes.string
    }

    static defaultProps={
        lgContainerClassName:"abc-content-lg-h",
        lgImageClassName:"image",
        smContainerClassName:"abc-content-sm",
        smImageClassName:"image-width-zoom2"
    }

    buildTableLargeCell(){
        return composeTableLargeCell(
            {containerClassName:this.props.lgContainerClassName,
                imageClassName:this.props.lgImageClassName})(AbcTableLargeCellWithToolbarBottom)
    }

    buildTableSmallCell(){
        return composeTableSmallCell({imageClassName:this.props.smImageClassName})(AbcTableSmallCell)
    }

    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        //对业务视图的class的调整
        const TableLargeCell=this.buildTableLargeCell();
        const TableSmallCell=this.buildTableSmallCell();
        //数据
        const  smObjectsTop= smObjects.slice(0,1);
        const  smObjectsBottom=smObjects.slice(1,smObjects.length);
        return (
            <AbcListCol>
                <AbcTableFrame>
                    <tr align="center">
                        {lgObjects&&lgObjects.map&&lgObjects.map((lgObject, index) =>
                            <AbcTableLargeLeftTd>
                                <TableLargeCell lgObject={lgObject}
                                                key={index} {...others} />
                            </AbcTableLargeLeftTd>
                        )}
                        {smObjectsTop&&smObjectsTop.map&&smObjectsTop.map((smObject, index) =>
                            <AbcTableSmallTd className="td-1-2-r">
                                <TableSmallCell smObject={smObject}
                                                key={index} {...others} />
                            </AbcTableSmallTd>
                        )
                        }

                    </tr>
                    <tr>
                        {smObjectsBottom&&smObjectsBottom.map&&smObjectsBottom.map((smObject, index) =>
                            <AbcTableSmallTd className="td-1-2-r">
                                <TableSmallCell smObject={smObject}
                                                key={index} {...others} />
                            </AbcTableSmallTd>
                        )}
                    </tr>
                </AbcTableFrame>
            </AbcListCol>
        )
    }
}
/**
 * 左边一个大图，右边上下各有1个小图
 *  ---------------
 * \      \       \
 * \      \       \
 * \      \-------
 * \      \       \
 * \      \       \
 * ---------------
 */
export class AbcTableLeft1RightsTop1Bottom1 extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop1Bottom1Row;
    }
}

/**
 * 左边一个大图，右边上下各有1个小图
 *  ---------------
 * \      \       \
 * \      \       \
 * \      \-------
 * \      \       \
 * \      \       \
 * ---------------
 */
export class AbcTableLeft1RightsTop1Bottom1SimpleRow extends AbcTableLeft1RightsTop1Bottom1Row{
    static defaultProps={
        lgContainerClassName:"abc-content-lg",
        lgImageClassName:"image-s",
        smContainerClassName:"abc-content-sm-right",
        smImageClassName:"image-right"
    }
    buildTableLargeCell(){
        return composeTableLargeCell(
            {containerClassName:this.props.lgContainerClassName,
                imageClassName:this.props.lgImageClassName})(AbcTableLargeCellWithToolbarBottom)
    }
    buildTableSmallCell(){
        return composeTableSmallCell( {containerClassName:this.props.smContainerClassName,
            imageClassName:this.props.smImageClassName})(AbcTableSmallCellImageTop);
    }
}

export class AbcTableLeft1RightsTop1Bottom1Simple extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop1Bottom1SimpleRow;
    }
}

/**
 * 左边一个大图，右边上下各有1个小图
 *  ---------------
 * \      \       \
 * \      \       \
 * \      \-------
 * \      \       \
 * \      \       \
 * ---------------
 */
export class AbcTableLeft1RightsTop1Bottom1SimpleLeftRow extends AbcTableLeft1RightsTop1Bottom1SimpleRow{
    static defaultProps={
        lgContainerClassName:"abc-content-lg",
        lgImageClassName:"image-s",
        smContainerClassName:"abc-content-sm",
        smImageClassName:"image-left"
    }
    buildTableSmallCell(){
        return composeTableSmallCell( {containerClassName:this.props.smContainerClassName,
            imageClassName:this.props.smImageClassName})(AbcTableSmallCellImageTop);
    }
}
export class AbcTableLeft1RightsTop1Bottom1LeftSimple extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop1Bottom1SimpleLeftRow;
    }
}
//left
/**
 * 上边两个下边四个
 * ------------------
 * \       \        \
 * \       \        \
 * \-------\--------
 * \   \   \   \    \
 * \   \   \   \    \
 * ------------------
 */
export class AbcTableTop2Bottom4Row extends AbcTableRowDefault{

    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        //对业务视图的class的调整
        const TableLargeCell=composeTableLargeCell()(AbcTableLargeCellWithToolbar);
        const TableSmallCell =composeTableSmallCell({
            imageClassName:this.props.smImageClassName,
            contentClassName:this.props.smContentClassName
        })(AbcTableSmallCell);
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
                    <tr>
                        {smObjects&&smObjects.map&&smObjects.map((smObject, index) =>
                            <AbcTableSmallTd>
                                <TableSmallCell smObject={smObject}
                                                key={index} {...others} />
                            </AbcTableSmallTd>
                        )}
                    </tr>
                </AbcTableFrame>
            </AbcListCol>
        )
    }
}

export class AbcTableTop2Bottom4 extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableTop2Bottom4Row;
    }
}

/**
 * 左边一个大图，右边上下各有1个小图
 *  ---------------
 * \      \        \
 * \      \        \
 * \      \---\----
 * \      \   \    \
 * \      \   \    \
 * -----------------
 */
export class AbcTableLeft1RightsTop1Bottom2Row extends AbcTableRowDefault{
    static propTypes={
        mdImageClassName:PropTypes.string,
        middleOption:PropTypes.object,
        smallOption:PropTypes.object,
    }
    static defaultProps={
        mdImageClassName:"image-right",
        middleOption:{imageClassName:"image-right",
            containerClassName:"abc-content-md"},
        smallOption:{imageClassName:"image-static"}
    }

    buildTableMiddleCell(){
         return composeTableSmallCell(this.props.middleOption)(AbcTableMiddleCell)
    }
    buildTableSmallCell(option,cellClass){
        return composeTableSmallCell(this.props.smallOption)(AbcTableSmallCell)
    }
    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        //对业务视图的class的调整
        const TableLargeCell=composeTableLargeCell(
            {containerClassName:"abc-content-lg",imageClassName:"image"})(AbcTableLargeCellWithToolbarBottom);
        //AbcTableMiddleCell
        const TableMiddleCellTop=this.buildTableMiddleCell();
        const TableSmallCellBottom=this.buildTableSmallCell();
        //数据
        const  smObjectsTop= smObjects.slice(0,1);
        const  smObjectsBottom=smObjects.slice(1,smObjects.length);
        return (
            <AbcListCol>
                <AbcTableFrame>
                    <tr align="center">
                        {lgObjects&&lgObjects.map&&lgObjects.map((lgObject, index) =>
                            <AbcTableLargeLeftTd>
                                <TableLargeCell lgObject={lgObject}
                                                key={index} {...others} />
                            </AbcTableLargeLeftTd>
                        )}
                        {smObjectsTop&&smObjectsTop.map&&smObjectsTop.map((smObject, index) =>
                            <AbcTableSmallTd className="td-1-2-t" colSpan={2}>
                                <TableMiddleCellTop smObject={smObject}
                                                key={index} {...others} />
                            </AbcTableSmallTd>
                        )
                        }

                    </tr>
                    <tr>
                        {smObjectsBottom&&smObjectsBottom.map&&smObjectsBottom.map((smObject, index) =>
                            <AbcTableSmallTd className="td-1-2-b">
                                <TableSmallCellBottom smObject={smObject}
                                                key={index} {...others} />
                            </AbcTableSmallTd>

                        )}
                    </tr>
                </AbcTableFrame>
            </AbcListCol>
        )
    }
}
/**
 * 左边一个大图，右边上面小图，下面两个小图
 *  ---------------
 * \      \        \
 * \      \        \
 * \      \---\----
 * \      \   \    \
 * \      \   \    \
 * -----------------
 */
export class AbcTableLeft1RightsTop1Bottom2 extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop1Bottom2Row;
    }
}

/**
 * 左边一个大图，右边上面一个宽度乘2，下面两个小图
 *  ---------------
 * \      \        \
 * \      \        \
 * \      \---\----
 * \      \   \    \
 * \      \   \    \
 * -----------------
 */
export class AbcTableLeft1RightsTop1Bottom2SimpleRow extends AbcTableLeft1RightsTop1Bottom2Row{
    static defaultProps={
        middleOption:{imageClassName:"image-h",
            containerClassName:"abc-content-md"},
    }
    buildTableMiddleCell(){
        return composeTableSmallCell(this.props.middleOption)(AbcTableMiddleCellSimple)
    }
    buildTableSmallCell(){
        return composeTableSmallCell()(AbcTableSmallCellSimple)

    }
}

export class AbcTableLeft1RightsTop1Bottom2Simple extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableLeft1RightsTop1Bottom2SimpleRow;
    }
}

//////////////////单行显示,图在左边，默认方式//////////////////
export class AbcTableSingleColRow extends AbcTableRowDefault{
    static propTypes={
        smContainerClassName:PropTypes.string,
        smImageClassName:PropTypes.string,
        smContentClassName:PropTypes.string
    }
    static defaultProps={
        smContainerClassName:"abc-content-sm-single",
        smImageClassName:"image-left",
        smContentClassName:"abc-content-fiexed-width"
    }
    buildTableSmallCell(){
        return composeTableSmallCell(
            {imageClassName:this.props.smImageClassName,
                containerClassName:this.props.smContainerClassName,
                contentClassName:this.props.smContentClassName
            })(AbcTableSmallSingleCol);
    }
    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        const TableSmallCell=this.buildTableSmallCell();
        //数据,默认可以有个编辑按钮
        return (
            <div>
                {smObjects && smObjects.map && smObjects.map((smObject, index) =>
                    <AbcListCol>
                        <AbcTableFrame>
                            <tr>
                                <AbcTableSmallTd className="td-1-2-r">
                                    <TableSmallCell smObject={smObject}
                                                    key={index} {...others} />
                                </AbcTableSmallTd>
                                <td className="td-edit-button-right">
                                    <AbcTableCellFunctions  {...others} />
                                </td>
                            </tr>
                        </AbcTableFrame>
                    </AbcListCol>
                )
                }
            </div>
        )
    }
}
/**
 * 左边一个大图，右边上下各有1个小图
 * ---------------
 * \              \
 * ---------------
 */
export class AbcTableSingleCol extends AbcTable{
    buildAbcTableGrid(){
        return AbcTableSingleColRow;
    }
    render()
    {
        const {header,rowProducts,...others}=this.props;
        const TableRow=this.buildAbcTableGrid();
        const panel=
            ( <AbcPanel  header={header}>
                <AbcTableGrid>
                    {
                        rowProducts&& <TableRow smObjects={rowProducts} {...others}/>
                    }
                </AbcTableGrid>
            </AbcPanel>)
        return panel;
    }
}

////////////////////单行显示，图在右边/////////////////////////////////////////
export class AbcTableSingleLeftImageColRow extends AbcTableSingleColRow{
    static defaultProps={
        smContainerClassName:"abc-content-sm-right",
        smImageClassName:"image-right"
    }
    buildTableSmallCell(){
        return composeTableSmallCell(
            {imageClassName:this.props.smImageClassName,
                containerClassName:this.props.smContainerClassName,
                contentClassName:this.props.smContentClassName
            })(AbcTableSmallSingleColToolbar);
    }
    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        const TableSmallCell=this.buildTableSmallCell();
        //数据,默认可以有个编辑按钮
        return (
            <div>
                {smObjects && smObjects.map && smObjects.map((smObject, index) =>
                    <AbcListCol>
                        <AbcTableFrame>
                            <tr>
                                <td className="td-edit-button-left">
                                    <AbcTableCellFunctions {...others} />
                                </td>
                                <AbcTableSmallTd className="td-1-2-r">
                                    <TableSmallCell smObject={smObject}
                                                    key={index} {...others}/>
                                </AbcTableSmallTd>

                            </tr>
                        </AbcTableFrame>
                    </AbcListCol>
                )
                }
            </div>
        )
    }
}

export class AbcTableSingleLeftImageColCol extends AbcTableSingleCol{
    buildAbcTableGrid(){
        return AbcTableSingleLeftImageColRow;
    }
}

