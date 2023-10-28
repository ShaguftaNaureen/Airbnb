'use client'

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import {toast} from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const LoginModal = () =>{
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>(
    {defaultValues:{
        email:"",
        password: "",
    }})

    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //     console.log("dataconsole", data)
    //     setLoading(true)
        
    //     signIn('credentials', {
    //         ...data,
    //         redirect: false,
    //     })
    //     .then((callback)=>{
    //         console.log("callbacktest", callback?.ok, callback?.error, callback?.status)
    //         setLoading(false)

    //         if(callback?.ok){
    //             toast.success('Logged in')
    //             router.refresh()
    //             loginModal.onClose()
    //         }
    //         if(callback?.error){
    //             toast.error(callback.error)
    //         }
    //     })
    // }

    const onSubmit:  SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
      
        try {
          const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            // redirect: false, // Do not automatically redirect
          });
          if (result?.error) {
            // Handle login error
            toast.error(result.error);
          } else {
            // Login was successful
            toast.success('Logged in');
            router.refresh(); 
            loginModal.onClose(); // Close the login modal
          }
        } catch (error) {
          // Handle unexpected errors
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };  

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back"
                subtitle="Login to your account!"
            />
            <Input 
                id="email"
                label="Email"
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                type="password"
                label="Password"
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label= "Continue with Google"
                icon={FcGoogle}
                onClick={() =>signIn('google')}
            />
            <Button
                outline
                label= "Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light flex flex-row justify-center'>
                <div className="items-center gap-2">
                    Already have an account?
                </div>
                <div 
                onClick={registerModal.onClose}
                className="text-neutral-800 cursor-point hover:underline pl-2">
                    Log in
                </div>
            </div>
        </div>
    ) 

    return(
        <Modal
            disabled={loading}
            isOpen={loginModal.isOpen}
            title= "Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal