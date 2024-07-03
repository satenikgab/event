import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventContext } from "../lib/Context";
import { addEvent } from "../lib/api";
import { ActionTypes, IEvent } from "../lib/types";
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
    type:string
    composer:string
}
export const AddEvent = () => {

    const context  = useContext(EventContext)
    if(!context){
        throw new Error("Error")
    }
    const {dispatch} = context
    const [open, setOpen] = useState<boolean>(false)
    const {register, handleSubmit ,reset,formState:{errors} } = useForm<Inputs>()
    type newEvent = Omit<IEvent,"id">
    const handleAdd:SubmitHandler<Inputs> = (data) => {
        
        const { title, date, time, composer, cover, type } = data
        
        const newEv:newEvent = { title, date, time, composer, cover, type }
        
        
        addEvent(newEv)
            .then(res => {
               
                dispatch({ type: ActionTypes.addEvent, payload: res })
            })
        reset()
        setOpen(false)
    }
   
   
   return <Box my={2}>
        <Button onClick={() => setOpen(true)} variant="contained">add</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="title"
                            {...register("title", {
                                required: "Title is required",
                                minLength: { value: 3, message: "Title must be at least 3 characters long" }
                              })}
                              error={!!errors.title}
                              helperText={errors.title ? errors.title.message : ''}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="date"
                            {...register("date", {
                                required: "Date is required",
                                minLength: { value: 3, message: "Date must be at least 3 characters long" }
                              })}
                              error={!!errors.title}
                              helperText={errors.title ? errors.title.message : ''}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="time"
                            {...register("time", {
                                required: "Time is required",
                                minLength: { value: 3, message: "Time must be at least 3 characters long" }
                              })}
                              error={!!errors.title}
                              helperText={errors.title ? errors.title.message : ''}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="composer"
                            {...register("composer", {
                                required: "Composer is required",
                                minLength: { value: 3, message: "Composer must be at least 3 characters long" }
                              })}
                              error={!!errors.title}
                              helperText={errors.title ? errors.title.message : ''}
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
                            {...register("cover", {
                                required: "Cover is required",
                                minLength: { value: 3, message: "Cover must be at least 3 characters long" }
                              })}
                              error={!!errors.title}
                              helperText={errors.title ? errors.title.message : ''}
                          
                        />
                    </Box>
                    <Button type="submit" variant="outlined"> submit</Button>
                </form>
            </Box>
        </Modal>
    </Box>
}















