import {redirect} from 'react-router-dom'

export function action() {
    localStorage. removeItem('persist:root')
    return redirect('/')
} 