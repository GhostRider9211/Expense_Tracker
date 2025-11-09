import {createContext,useContext,useEffect,useState,useMemo}from 'react';
import api from './api';

type User ={
    id:string;
    name?:string;
    email:string;
}
type AuthContextType ={
    user:User|null;
    isAuthed:boolean;
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}:{children: React.ReactNode}){
    const [user,setUser] = useState<User | null>(null);

    useEffect(()=>{
        const saved = localStorage.getItem('user');
        if(saved) setUser(JSON.parse(saved));
    },[]);

    const login = async (email:string,password:string)=>{
        const {data} = await api.post('/auth/login',{email,password});
        const token = data?.token;
        const user = data?.user||{id:data?.id,email:data?.email}
        if(!token) throw new Error('NO token in response');
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        setUser(user);
    }
    const signup  = async(name:string,email:string,password:string)=>{
        const {data} = await api.post('/auth/signup',{name,email,password});
        const token = data?.token;
        const user = data?.user || {id:data?.id,email:data?.email,name:data?.name}
        if(token) localStorage.setItem('token',token);
        if(user){
            localStorage.setItem('user',JSON.stringify(user));
            setUser(user);
        }
    }

    const logout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }
    const value = useMemo(()=>({
        user,
        isAuthed:!!user,
        login,
        signup,
        logout,
    }),[user]);
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>

}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error('useAuth must be used within Authorization')
        return ctx;
}
