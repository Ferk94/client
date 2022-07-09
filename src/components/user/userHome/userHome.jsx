import './userHome.css'


export function UserHome({ userInfo }) {






    return <div className='userHomeComponent'>
        <div className='userHomeComponentRegister'>
            <h1 >Bienvenido {userInfo.name}!</h1>
        </div>
    </div>
}