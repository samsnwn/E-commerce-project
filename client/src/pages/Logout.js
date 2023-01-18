import {redirect} from 'react-router-dom'

export function action() {
    localStorage.getItem('persist:root')
    return redirect('/')
} 