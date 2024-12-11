import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const ConfirmacionEliminacion = ({ open, onClose, onConfirm, text }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    fontFamily: "'Montserrat', sans-serif",
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    color: "#ff4d4f",
                    textAlign: "center",
                    fontSize: "1.6rem",
                }}
            >
                ¡Confirmación!
            </DialogTitle>
            <DialogContent
                sx={{
                    padding: "24px",
                    backgroundColor: "#fff5f5",
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1rem",
                        color: "#6b7280",
                        lineHeight: 1.5,
                    }}
                >
                    {text || "¿Estás seguro de realizar esta acción?"}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    padding: "16px",
                    backgroundColor: "#fff5f5",
                    justifyContent: "space-around",
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#6b7280",
                        borderColor: "#d32f2f",
                        "&:hover": {
                            borderColor: "#9e2828",
                            backgroundColor: "rgba(255, 77, 79, 0.1)",
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                        padding: "10px 24px",
                        borderRadius: "8px",
                        backgroundColor: "#d32f2f",
                        fontFamily: "'Montserrat', sans-serif",
                        "&:hover": {
                            backgroundColor: "#9e2828",
                            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                        },
                    }}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmacionEliminacion;
