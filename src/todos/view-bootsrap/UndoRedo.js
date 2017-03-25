import React , { PropTypes } from 'react'
import { Button,ButtonToolbar} from '../../abc-bootstrap'
import section from '../../abc-framework/ui/AbcSection'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
        <ButtonToolbar style={{ position: 'relative',
            float:'left', right:'-70px', top:'-0px'}}>
                <Button onClick={onUndo} disabled={!canUndo}>
                    撤销
                </Button>
                <Button onClick={onRedo} disabled={!canRedo}>
                    恢复
            </Button>
        </ButtonToolbar>
);
// @section()
// export default class UndoRedo extends React.Component{
//
//     render(){
//         return (<ButtonToolbar style={{ position: 'relative',
//             float:'left', right:'-70px', top:'-0px'}}>
//                 <Button onClick={onUndo} disabled={!canUndo}>
//                     撤销
//                 </Button>
//                 <Button onClick={onRedo} disabled={!canRedo}>
//                     恢复
//                 </Button>
//             </ButtonToolbar>
//         )
//     }
// }
//
UndoRedo.propTypes = {
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired
};

const _UndoRedo = section()(UndoRedo);

export default  _UndoRedo