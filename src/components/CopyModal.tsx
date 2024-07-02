import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { ActionTypes, IEvent } from "../lib/types";
import { addEvent } from "../lib/api";
import { EventContext } from "../lib/Context";
interface CopyModal{
    event:IEvent
}

export const CopyModal:React.FC<CopyModal> = ({event}) => {

    const context  = useContext(EventContext)
    if(!context){
        throw new Error("Error")
    }
    const {dispatch} = context

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      interface Inputs{
        title:string
        date:string
        time:string
        cover:string
        type:Event
        composer:string
    }


      const [open ,setOpen] = useState<boolean>(false)
      const {register, handleSubmit ,setValue ,reset} = useForm<Inputs>({
        defaultValues:{
            title:"",
            date:"",
            time:"",
            cover:"",
            type:Event,
            composer:""

        }
      })
      type newEvent = Omit<IEvent,"id">
      
      const handleCopy:SubmitHandler<Inputs> = (data) => {
       
       
        const { title, date, time, composer, cover, type } = data
        const newEv:newEvent = { title, date, time, composer, cover, type }
        addEvent(newEv)
            .then(res => {
               
                dispatch({ type: ActionTypes.addEvent, payload: res })
            })
        reset()
        setOpen(false)
    
    }
    useEffect(() => {
        if(open){
            setValue("title" ,event.title),
            setValue("date",event.date),
            setValue("time",event.time),
            setValue("cover" , event.cover),
            setValue("composer" , event.composer)
        }

    },[open,event,setValue])

    return <>
    

    <Button onClick={() => setOpen(true)} key={event.id} variant="contained">copy</Button>
    
    <Modal open={open} onClose={() => setOpen(false)}>
         <Box sx={style}>
            <form onSubmit={handleSubmit(handleCopy)}>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="title"
                            {...register("title")}
                            
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="date"
                            {...register("date")}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="time"
                            {...register("time")}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="composer"
                            {...register("composer")}
                        />
                    </Box>
                    <Box my={2}>
                       <Select sx={{width:200}} {...register("type")}>
                           <MenuItem value="opera">opera</MenuItem>
                           <MenuItem value="ballet">ballet</MenuItem>
                       </Select>
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            {...register("cover")}
                            label="cover"
                        />
                    </Box>
                    <Button type="submit" variant="outlined" > save</Button>
                </form>
            </Box>
        </Modal>
    
    </>

}