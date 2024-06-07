import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
    Container,
    Paper,
    Box,
    Button,
    Typography,
} from '@mui/material';
import {User} from "../models/user";
import {updateOrder} from "../functionality/UpdateDataService";
import {notifyError, notifySuccess} from "./NotifyCenter";

interface Item {
    id: string;
    content: string;
}

const DraggableList: React.FC<{ user: User, setter: any }> = ({user,setter}) => {
    let initialItems: Item[] = [
    ];

    for (let i = 0; i < user.settings.checkOrders.length; i++) {
        initialItems.push({id: String(i + 1), content: user.settings.checkOrders[i]});
    }

    // const [selectedItem, setSelectedItem] = useState<string>('');
    //
    // const handleSelectChange = (event: SelectChangeEvent<string>) => {
    //     setSelectedItem(event.target.value as string);
    // };
    //
    // const availableItems: Item[] = [
    // ];

    const [items, setItems] = useState<Item[]>(initialItems);

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(items);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setItems(reorderedItems);
    };

    const handleSave = async () => {
        let orders: string[] = [];

        for (let it of items){
            orders.push(it.content);
        }

        const res = await updateOrder({'orders': orders});
        if (res) {
            notifySuccess("Данные успешно обнавлены!");
            user.settings.checkOrders = orders;
            setter(user);
        } else {
            notifyError("Ошибка - смотрите логи");
        }
    };

    // const handleTypeSave = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //
    //     const res = await updateOrder({'orders': "s"});
    //     if (res) {
    //         notifySuccess("Данные успешно обнавлены!");
    //
    //         setter(user);
    //     } else {
    //         notifyError("Ошибка - смотрите логи");
    //     }
    // };

    return (
        <Container>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <Paper
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                userSelect: 'none',
                                                padding: '16px',
                                                margin: '0 0 8px 0',
                                                backgroundColor: '#f5f5f5',
                                                color: '#333',
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            <Typography>{item.content}</Typography>
                                        </Paper>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>

            <Button fullWidth variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
                Сохранить
            </Button>
            {/*<form onSubmit={handleTypeSave}>*/}
            {/*    <FormControl style={{ marginTop: '16px' }}>*/}
            {/*        <InputLabel id="select-item-label">Select Item</InputLabel>*/}
            {/*        <Select*/}
            {/*            labelId="select-item-label"*/}
            {/*            value={selectedItem}*/}
            {/*            onChange={handleSelectChange}*/}
            {/*        >*/}
            {/*            {availableItems.map((item) => (*/}
            {/*                <MenuItem key={item.id} value={item.id}>*/}
            {/*                    {item.content}*/}
            {/*                </MenuItem>*/}
            {/*            ))}*/}
            {/*        </Select>*/}
            {/*        <Button fullWidth variant="contained" color="primary"  style={{ marginTop: '16px' }}>*/}
            {/*            Сохранить тип*/}
            {/*        </Button>*/}
            {/*    </FormControl>*/}
            {/*</form>*/}

        </Container>
    );
};

export default DraggableList;