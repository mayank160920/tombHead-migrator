import { toast } from 'react-toastify';

export function notify(content,options=null) {
    return toast(content,options)
}
