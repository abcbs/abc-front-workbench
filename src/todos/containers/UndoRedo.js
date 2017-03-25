import React , { PropTypes } from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import UndoRedo from '../view-bootsrap/UndoRedo'

const mapStateToProps = (state) => {
  const todo=state.todos||state.default.todos;
  return {
    canUndo: todo.past.length > 0,
    canRedo: todo.future.length > 0
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
};

const UndoRedoUtil = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedoUtil
