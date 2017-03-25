export  const list={
    formConfig:{
        authName: {readonly:true,displayLabel:false},
        authCode: {readonly:true,displayLabel:false},
        authDecript:{readonly:true,displayLabel:false},
        operattion:{
            display:false,
            inline:true,
            add:false,
            edit:true,
            delete:false,
            reset:false,
            simulate:false
        },
        header:{display:false},
        footer:{display:false},
    }
}

export  const manager={
    formConfig:{
        authName: {readonly:false,displayLabel:false},
        authCode: {readonly:false,displayLabel:false},
        authDecript:{readonly:false,displayLabel:false},
        operattion:{
            display:true,
            add:true,
            edit:false,
            delete:false,
            reset:true,
            simulate:true
        },
        header:{display:true},
        footer:{display:false},
    }
}