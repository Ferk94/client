import './userProfile.css'


export function UserProfile({ userInfo }) {




    return <div className='userProfileComponent'>
        <div className='userProfileComponentRegister'>
            <h1 >
                Perfil de {userInfo.name}
            </h1>
        </div>
    </div>
}