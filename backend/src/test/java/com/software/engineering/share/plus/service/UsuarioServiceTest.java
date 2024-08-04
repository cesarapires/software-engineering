package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.entity.Usuario;
import com.software.engineering.share.plus.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {


    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario usuario;

    @BeforeEach
    public void setup() {
        usuario = new Usuario();
        usuario.setSaldo(100.0);
    }

    @Test
    public void testAddSaldo_Success() {
        Double valorDeposito = 50.0;

        usuarioService.addSaldo(usuario, valorDeposito);

        assertEquals(150.0, usuario.getSaldo());
        verify(usuarioRepository).save(usuario);
    }

    @Test
    public void testAddSaldo_NegativeOrZeroValue() {
        Double valorDeposito = 0.0;

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            usuarioService.addSaldo(usuario, valorDeposito);
        });

        assertEquals("Valor a ser depositado deve ser positivo.", exception.getMessage());
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    public void testRemoveSaldo_Success() {
        Double valor = 50.0;

        usuarioService.removeSaldo(usuario, valor);

        assertEquals(50.0, usuario.getSaldo());
        verify(usuarioRepository).save(usuario);
    }

    @Test
    public void testRemoveSaldo_NegativeOrZeroValue() {
        Double valor = 0.0;

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            usuarioService.removeSaldo(usuario, valor);
        });

        assertEquals("Valor a ser sacado deve ser positivo.", exception.getMessage());
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    public void testRemoveSaldo_InsufficientBalance() {
        Double valor = 200.0;

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            usuarioService.removeSaldo(usuario, valor);
        });

        assertEquals("Saldo insuficiente para realizar esta transação!", exception.getMessage());
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }
}