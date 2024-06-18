package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.model.CarteiraAcao;
import com.software.engineering.share.plus.model.HistoricoCompras;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.HistoricoComprasRepository;
import com.software.engineering.share.plus.util.MockEntityFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyDouble;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CarteiraAcaoServiceTest {

    @Mock
    private AcaoService acaoService;

    @Mock
    private CarteiraService carteiraService;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private CarteiraAcaoRepository carteiraAcaoRepository;

    @Mock
    private HistoricoComprasRepository historicoComprasRepository;

    @InjectMocks
    private CarteiraAcaoService carteiraAcaoService;

    private BuyAcaoDTO dto;
    private Acao acao;
    private Carteira carteira;

    @BeforeEach
    public void setup() {
        dto = MockEntityFactory.createBuyAcaoDTO(1L, 1L, 10);
        acao = MockEntityFactory.createAcao(1L, 100.0);
        carteira = MockEntityFactory.createCarteira(1L);
    }

    @Test
    public void testBuyAcao_NewCarteiraAcao() {
        when(acaoService.findById(dto.getIdAcao())).thenReturn(acao);
        when(carteiraService.findById(dto.getIdCarteira())).thenReturn(carteira);
        when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.empty());

        CarteiraAcao result = carteiraAcaoService.buyAcao(dto);

        assertNotNull(result);
        assertEquals(dto.getQuantidade(), result.getQuantidade());
        verify(usuarioService).removeSaldo(acao.getPreco() * dto.getQuantidade());
        verify(carteiraAcaoRepository).save(result);
        verify(historicoComprasRepository).save(any(HistoricoCompras.class));
    }

    @Test
    public void testBuyAcao_ExistingCarteiraAcao() {
        CarteiraAcao existingCarteiraAcao = new CarteiraAcao(5, acao, carteira);
        when(acaoService.findById(dto.getIdAcao())).thenReturn(acao);
        when(carteiraService.findById(dto.getIdCarteira())).thenReturn(carteira);
        when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.of(existingCarteiraAcao));

        CarteiraAcao result = carteiraAcaoService.buyAcao(dto);

        assertNotNull(result);
        assertEquals(15, result.getQuantidade());
        verify(usuarioService).removeSaldo(acao.getPreco() * dto.getQuantidade());
        verify(carteiraAcaoRepository).save(result);
        verify(historicoComprasRepository).save(any(HistoricoCompras.class));
    }

    @Test
    public void testBuyAcao_AcaoNotFound() {
        when(acaoService.findById(dto.getIdAcao())).thenThrow(new BadRequestException("Ação não encontrada na base de dados."));

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            carteiraAcaoService.buyAcao(dto);
        });

        assertEquals("Ação não encontrada na base de dados.", exception.getMessage());
        verify(usuarioService, never()).removeSaldo(anyDouble());
        verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
        verify(historicoComprasRepository, never()).save(any(HistoricoCompras.class));
    }

    @Test
    public void testBuyAcao_CarteiraNotFound() {
        when(acaoService.findById(dto.getIdAcao())).thenReturn(acao);
        when(carteiraService.findById(dto.getIdCarteira())).thenThrow(new BadRequestException("Carteira não encontrada na base de dados."));

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            carteiraAcaoService.buyAcao(dto);
        });

        assertEquals("Carteira não encontrada na base de dados.", exception.getMessage());
        verify(usuarioService, never()).removeSaldo(anyDouble());
        verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
        verify(historicoComprasRepository, never()).save(any(HistoricoCompras.class));
    }

    @Test
    public void testBuyAcao_InsufficientBalance() {
        when(acaoService.findById(dto.getIdAcao())).thenReturn(acao);
        when(carteiraService.findById(dto.getIdCarteira())).thenReturn(carteira);
        doThrow(new BadRequestException("Saldo insuficiente para realizar esta transação!"))
                .when(usuarioService).removeSaldo(anyDouble());

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            carteiraAcaoService.buyAcao(dto);
        });

        assertEquals("Saldo insuficiente para realizar esta transação!", exception.getMessage());
        verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
        verify(historicoComprasRepository, never()).save(any(HistoricoCompras.class));
    }
}
