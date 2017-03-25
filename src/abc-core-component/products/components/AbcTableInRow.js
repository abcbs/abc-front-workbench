/**
 * 列表显示，左边1列，右边两列，共计两行
 */
import React, { PropTypes } from 'react'
import classNames           from 'classnames'

import {Modal,Glyphicon,Grid,Row,Col} from '../../../abc-bootstrap'

import AbcPanel from '../../../abc-ui/AbcPanel'
import lgShape from './lg-shape';
import smShape from './sm-shape';
import AbcLabelLimit, {lgLimit} from './ui-limit'

import {composeTableLargeCell,composeTableSmallCell,AbcTableRowDefault,AbcTable,
    AbcListCol,AbcTableLargeTd,AbcTableSmallTd,AbcTableFrame}
    from './AbcTableListGridFrame'

import {
    AbcTableSmallCellToolbar,AbcTableSmallCellWithToolbar,AbcTableSmallCellWithBadge,
    AbcTableLargeCellToolbar,AbcTableLargeCellWithToolbar} from './AbcTableCell'

export class AbcTableRowFrame extends AbcTableRowDefault{

    buildTableLargeCellWithToolbar(option){
        const TableLargeCell=composeTableLargeCell(option)(AbcTableLargeCellWithToolbar);
        return TableLargeCell
    }
    buildTableLargeCellToolbar(option){
        const TableLargeCell=composeTableLargeCell(option)(AbcTableLargeCellToolbar);
        return TableLargeCell
    }

    buildTableSmallCellWithToolbar(option){
        return composeTableSmallCell(option)(AbcTableSmallCellWithToolbar)
    }
    buildTableSmallCellToolbar(option){
        return composeTableSmallCell(option)(AbcTableSmallCellToolbar)
    }
    buildTableSmallCellWithBadge(option){
        return composeTableSmallCell(option)(AbcTableSmallCellWithBadge)
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
                                                key={index} {...others}/>
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
//每行数据UI
/**
 * 主，共计三列，一列大格子，两列小个子
 * -------------------
 * \        \   \    \
 * \        \   \    \
 * --------------------
 */
export class AbcTableRow extends AbcTableRowFrame{

    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        // const TableLargeCell=composeTableLargeCell()(AbcTableLargeCell);
        let TableLargeCell;
        switch (tableType){
            case 1:
            case 2:
                TableLargeCell=this.buildTableLargeCellWithToolbar(
                    {imageClassName:"image-1-1"});
                break;
            case 3:
                TableLargeCell=this.buildTableLargeCellToolbar({imageClassName:"image-1-1"});

                break;
            default:
                TableLargeCell=this.buildTableLargeCell({imageClassName:"image-1-1"});
        }
         let TableSmallCell=this.buildTableSmallCell();
        switch (tableType){
            case 1:
                TableSmallCell=this.buildTableSmallCellWithToolbar();
                break;
            case 2:
                TableSmallCell=this.buildTableSmallCellWithBadge({imageClassName:"image-fixed--by-left-cell"});
                break;
            case 3:
                TableSmallCell=this.buildTableSmallCellToolbar();

                break;
            default:
                TableSmallCell=this.buildTableSmallCell();
        }
        return (
            <AbcListCol>
                <AbcTableFrame>
                    <tr align="center">
                        {lgObjects&&lgObjects.map&&lgObjects.map((lgObject, index) =>
                            <AbcTableLargeTd>
                                <TableLargeCell lgObject={lgObject}
                                                key={index} {...others}/>
                            </AbcTableLargeTd>
                        )}
                        {smObjects&&smObjects.map&&smObjects.map((smObject, index) =>
                            <AbcTableSmallTd>
                                <TableSmallCell smObject={smObject}
                                                  key={index} {...others} />
                            </AbcTableSmallTd>
                        )
                        }

                    </tr>
                </AbcTableFrame>
            </AbcListCol>
        )
    }
}

/**
 * 主，共计三列，一列大格子，两列小个子
 * -------------------
 * \        \   \    \
 * \        \   \    \
 * --------------------
 */
export default class AbcTableLeft1Right2Row2 extends AbcTable
{
    static propTypes =
    {
        header : PropTypes.object,
        lgObjects: PropTypes.arrayOf(lgShape).isRequired,
        smObjects: PropTypes.arrayOf(smShape).isRequired,
        tableType:PropTypes.number
    };
    buildAbcTableGrid(){
        return AbcTableRow;
    }
}

//每行UI,大图中包括Toolbar，小图中为文字，左边大图
/**
 * 主，共计三列，一列大格子，两列小个子
 * -------------------
 * \        \   \    \
 * \        \   \    \
 * --------------------
 */
export class AbcRowLeftToolbarRightText extends AbcTableRowFrame{
    static propTypes =
    {
        smImageClassName:PropTypes.string,
        smContentClassName:PropTypes.string
    };
    static defaultProps =
    {
        smImageClassName:"image-fixed--by-left-cell",
        smContentClassName:"abc-content"
    }
    render() {
        const {lgObjects,smObjects,tableType,...others}=this.props;
        const  TableLargeCell=super.buildTableLargeCellToolbar({imageClassName:"image-1-1"});

        let TableSmallCell=super.buildTableSmallCell({imageClassName:this.props.smImageClassName,
            contentClassName:this.props.smContentClassName
        });
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
                        {smObjects&&smObjects.map&&smObjects.map((smObject, index) =>
                            <AbcTableSmallTd>
                                <TableSmallCell smObject={smObject}
                                                  key={index} {...others} />
                            </AbcTableSmallTd>
                        )
                        }

                    </tr>
                </AbcTableFrame>
            </AbcListCol>
        )
    }
}

/**
/**
 * 主，共计三列，一列大格子，两列小个子
 * -------------------
 * \        \   \    \
 * \        \   \    \
 * --------------------
 */
export class AbcTableLeft1Right2Row2RightText extends AbcTableLeft1Right2Row2{

    buildAbcTableGrid(){
        return AbcRowLeftToolbarRightText;
    }
}

//每行UI,均为小个子Toolbar
/**
 * 共计三列，三个格子大小一致
 * -------------------
 * \   \   \   \    \
 * \   \   \   \    \
 * --------------------
 */
export class AbcRow4 extends AbcRowLeftToolbarRightText{
    static defaultProps =
    {
        smImageClassName:"image-list-row4",
        smContentClassName:"abc-content-row4"
    }

}

export class AbcTableRow4 extends AbcTableLeft1Right2Row2{

    buildAbcTableGrid(){
        return AbcRow4;
    }
}