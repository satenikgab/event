import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
    const [open, setOpen] = useState<boolean>(false)
    const {register, handleSubmit} = useForm<Inputs>()
    const handleAdd:SubmitHandler<Inputs> = (data) => {
        console.log(data)
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
                    <Button type="submit" variant="outlined"> submit</Button>
                </form>
            </Box>
        </Modal>
    </Box>
}















