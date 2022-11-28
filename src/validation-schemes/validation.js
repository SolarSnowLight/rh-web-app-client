const REQUIRED_FIELD = 'Обязательно для заполнения'

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {

        if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return 'Некорректный email адрес'
        }


        return true;
    }
}

export const linkValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {
        if(!value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
            return "Некорректная ссылка"
        }
    }
}

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {

        if (value.length < 6) {
            return 'Пароль должен содержать 6-ть или более символов'
        }

        return true;
    }
}

export const retryPasswordValidation = (password) => {
    return {
        required: REQUIRED_FIELD,
        validate: (value) => {
            
            if(value.length < 6) {
                return 'Пароль должен содержать 6-ть или более символов';
            }

            if(value !== password){
                return 'Пароли должны совпадать';
            }
    
            return true;
        }
    }
}