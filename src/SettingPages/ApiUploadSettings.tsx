import {Box, IconButton, InputAdornment, Stack, Typography} from "@mui/material";
import * as React from "react";
import SwaggerPanel from "../components/SwaggerPanel";
import TokenizedString from "../components/TokenizedString";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";



const ApiUploadSettings = () => {
    const [showToken, setShowToken] = useState(false);

    const handleClickShowToken = () => {
        setShowToken(!showToken);
    };

    return (
        <div>
            <Typography>Настройка загрузки через API для </Typography>
            <Stack spacing={2}>
                <div>
                    <h4>Token</h4>

                    {/*<TokenizedString token={localStorage.getItem("token")} maxLength={60}></TokenizedString>*/}
                    <div>
                        <TextField
                            variant="outlined"
                            type={showToken ? 'text' : 'password'}
                            value="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dCIsImV4cCI6MTcxNzc2MjIxMCwicm9sZXMiOlsiVVNFUiJdLCJmaXJzdE5hbWUiOiJ0ZXN0dCJ9.WMqDdBoHxkZw4bmxZTNXhjBlxSlTKowUCcXk382_amvAUoqbyB3tIksoMiZhGK_GsIDs3aqBckqRyF7HyrK9zA"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle token visibility"
                                            onClick={handleClickShowToken}
                                            edge="end"
                                        >
                                            {showToken ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </div>
                </div>
                <SwaggerPanel/>
            </Stack>
        </div>
    );
}

export default ApiUploadSettings;