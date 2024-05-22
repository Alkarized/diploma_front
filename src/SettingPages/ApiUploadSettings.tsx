import {Box, Typography} from "@mui/material";
import * as React from "react";
import SwaggerPanel from "../components/SwaggerPanel";
import TokenizedString from "../components/TokenizedString";



const ApiUploadSettings = () => {
    return (
        <div>
            <Typography>Настройка загрузки через API для </Typography>
            <Box>
                Для загрузки через API используется такой формат данных: <b>SWAGGER!</b>
                <div>
                    Token
                    <TokenizedString token={localStorage.getItem("token")} maxLength={60}></TokenizedString>
                </div>
                <SwaggerPanel/>
            </Box>
        </div>
    );
}

export default ApiUploadSettings;