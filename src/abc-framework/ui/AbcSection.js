import React, { Component ,createElement} from 'react'
import hoist_statics from 'hoist-non-react-statics'

const defualt_className="container";
export default function section(options:{})
{
    const _className =options&&options.className||defualt_className,
           _style =options&&options.style||{marginTop:'0px'};
    //
    return function(WrappedComponent)
    {
        const connectDisplayName = `AbcSection(${getDisplayName(WrappedComponent)})`
        class AbcSection extends Component
        {

            render()
            {
                const {className,children,...other}=this.props;
                // return
                // (
                //     <div className={className||_className} >
                //             <WrappedComponent {...this.props} />
                //                  {children}
                //         </div>
                //     )
                this.renderedElement= createElement(WrappedComponent,
                     {...this.props} ,

                )
                return createElement('div' ,
                    {className:_className, style:_style},
                    this.renderedElement)
            }
        }
        //
        AbcSection.displayName = connectDisplayName
        AbcSection.WrappedComponent = WrappedComponent
        return hoist_statics(AbcSection, WrappedComponent)
    }
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}