import React from 'react';
import PropTypes from 'prop-types';
import {CircularProgress} from "@mui/joy";

const LoadingBar = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh' // 전체 화면 높이를 사용
        }}>
            <CircularProgress
                determinate={false}
                size="lg"
                value={50}
                variant="plain"
                sx={{
                    "--CircularProgress-size": "150px",
                    "--CircularProgress-trackThickness": "15px",
                    "--CircularProgress-progressThickness": "15px"
                }}
            />
        </div>
    );
};

LoadingBar.propTypes = {};

export default LoadingBar;
