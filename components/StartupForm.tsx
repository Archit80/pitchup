"use client";
import React, {useActionState, useState} from 'react'
import {Input} from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';


const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string,string>>({});
  const [pitch, setPitch] = useState();
  const isSubmitting = false;

  const handleFormSubmit = async (prevState: any, formData: FormData) =>{
      try{
        const formValues = {
          title: formData.get('title') as string,
          description : formData.get('description') as string,
          category : formData.get('category') as string,
          link : formData.get('link') as string,
          pitch,
        }
        await formSchema.parseAsync(formValues);
        	
        console.log(formValues);
        
        // const result = await createIdea(prevState, formData, pitch);
        // console.log(result);
        

      }catch(error){
        console.log(error);
        if(error instanceof z.ZodError){
          const fieldErrors = error.flatten().fieldErrors;
          // console.log(fieldErrors);
          setErrors(fieldErrors as unknown as Record<string,string>);
          return {... prevState, error: 'Validation failed...', status: 'ERROR'}
      };
    }
      finally{

      }
  }
  
  
  // const [state, dispatch, isPending] = useActionState(action, initialState, permalink)
  const [state, formAction, pending] = useActionState( handleFormSubmit, {error:"", status: "INITIAL"},  );





  return (
    <form action={()=>{}} onSubmit={handleFormSubmit} className='startup-form'> 
      <div>
        <label htmlFor="title" className='startup-form_label '>Title</label>
        <Input id='title' name='title' className='startup-form_input' required placeholder='Startup Title'  />

        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>

      
      <div>
        <label htmlFor="description" className='startup-form_label '>Description</label>
        <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description'  />

        {errors.description && <p className='startup-form_error'>{errors.description}</p>}
      </div>


      <div>
        <label htmlFor="category" className='startup-form_label '>Category</label>
        <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category (Tech, Health, Education...)'  />

        {errors.category && <p className='startup-form_error'>{errors.category}</p>}
      </div>


      <div>
        <label htmlFor="link"  className='startup-form_label '>Image URL</label>
        <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image URL'  />

        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>
  
      <div data-color-mode="light">
        <label htmlFor="pitch"  className='startup-form_label '>Pitch </label>
        {/* <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image URL'  /> */}
        <MDEditor 
          value={pitch} 
          onChange= {(value)=>setPitch(value as string)}
          preview="edit"
          height={300}
          style={{backgroundColor: 'white', borderRadius:20, overflow:'hidden'}}
          textareaProps={{placeholder: 'Briefly describe your startup idea and how it works'}}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />
        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
      
        </div>

          <Button type='submit' className='startup-form_btn text-white' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Your Startup'}  
              <Send className='size-6 ml-2' />
          </Button>

    </form>
  )
}

export default StartupForm