import { commitUsers } from "@/utils/commitUsers"

class usersService {

    private _userIdentifier: string
    private _newUserName: string
    private _newUserEmail: string

    constructor(params:{ userIdentifier: string, newUserName: string, newUserEmail: string }){
        this._userIdentifier = params.userIdentifier
        this._newUserName = params.newUserName
        this._newUserEmail = params.newUserEmail
    }

    public async EditUsers() {
        try {
            const response = await fetch('/editarUsuarios', { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    newUserName: this._newUserName, 
                    newUserEmail:this._newUserEmail, 
                    userIdentifier: this._userIdentifier
                })
            });
    
            if (!response.ok) { throw new Error('Something went wrong!'); }

            await commitUsers()

            return response 
        } catch (error) {
            return error instanceof Error
        }
       
    }

    public async deleteUser(){
        try {
            const response = await fetch('/deletarUsuarios', { 
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userIdentifier: this._userIdentifier
                })
            });
    
            if (!response.ok) { throw new Error('Something went wrong!'); }

            await commitUsers()

            return response 
        } catch (error) {
            return error instanceof Error
        }
       
    }
    
}

export default usersService;