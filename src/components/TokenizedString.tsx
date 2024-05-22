import React from 'react';

const TokenizedString: React.FC<{ token: string | null, maxLength: number }>  = ({ token, maxLength }) => {
    // Функция для разбиения строки на подстроки по указанной длине
    const splitString = (strs : string, maxLength : number) => {
        const str = strs.replace("\n", "");
        const substrings = [];
        let index = 0;
        while (index < str.length) {
            substrings.push(str.substring(index, index + maxLength));
            index += maxLength;
        }
        return substrings;
    };

    let lines;
    // Разбиваем строку на подстроки с учетом максимальной длины
    if (token == null){
        lines = splitString("nothing", maxLength);
    } else {
        lines = splitString(token, maxLength);
    }


    return (
        <div>
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>
    );
};

export default TokenizedString;