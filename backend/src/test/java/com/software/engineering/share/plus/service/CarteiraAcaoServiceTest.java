package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.dto.request.BuyAcaoDTO;
import com.software.engineering.share.plus.dto.request.SellAcaoDTO;
import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.model.Acao;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.model.CarteiraAcao;
import com.software.engineering.share.plus.model.HistoricoTransacao;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.HistoricoTransacaoRepository;
import com.software.engineering.share.plus.util.MockEntityFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
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
    private HistoricoTransacaoRepository historicoTransacaoRepository;

    @InjectMocks
    private CarteiraAcaoService carteiraAcaoService;

    private Acao acao;
    private Carteira carteira;

    @BeforeEach
    public void setup() {
        acao = MockEntityFactory.createAcao(1L, 100.0);
        carteira = MockEntityFactory.createCarteira(1L);
    }

    @Nested
    class testBuyAcao {
        private BuyAcaoDTO buyDto;
        @BeforeEach
        public void setup() {
            buyDto = MockEntityFactory.createBuyAcaoDTO(1L, 1L, 10);
        }

        @Test
        public void testBuyAcao_NewCarteiraAcao() {
            when(acaoService.findById(buyDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(buyDto.getIdCarteira())).thenReturn(carteira);
            when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.empty());

            CarteiraAcao result = carteiraAcaoService.buyAcao(buyDto);

            assertNotNull(result);
            assertEquals(buyDto.getQuantidade(), result.getQuantidade());
            verify(usuarioService).removeSaldo(acao.getPreco() * buyDto.getQuantidade());
            verify(carteiraAcaoRepository).save(result);
            verify(historicoTransacaoRepository).save(any(HistoricoTransacao.class));
        }

        @Test
        public void testBuyAcao_ExistingCarteiraAcao() {
            CarteiraAcao existingCarteiraAcao = new CarteiraAcao(5, acao, carteira);
            when(acaoService.findById(buyDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(buyDto.getIdCarteira())).thenReturn(carteira);
            when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.of(existingCarteiraAcao));

            CarteiraAcao result = carteiraAcaoService.buyAcao(buyDto);

            assertNotNull(result);
            assertEquals(15, result.getQuantidade());
            verify(usuarioService).removeSaldo(acao.getPreco() * buyDto.getQuantidade());
            verify(carteiraAcaoRepository).save(result);
            verify(historicoTransacaoRepository).save(any(HistoricoTransacao.class));
        }

        @Test
        public void testBuyAcao_AcaoNotFound() {
            when(acaoService.findById(buyDto.getIdAcao())).thenThrow(new BadRequestException("Ação não encontrada na base de dados."));

            BadRequestException exception = assertThrows(BadRequestException.class, () -> {
                carteiraAcaoService.buyAcao(buyDto);
            });

            assertEquals("Ação não encontrada na base de dados.", exception.getMessage());
            verify(usuarioService, never()).removeSaldo(anyDouble());
            verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
            verify(historicoTransacaoRepository, never()).save(any(HistoricoTransacao.class));
        }

        @Test
        public void testBuyAcao_CarteiraNotFound() {
            when(acaoService.findById(buyDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(buyDto.getIdCarteira())).thenThrow(new BadRequestException("Carteira não encontrada na base de dados."));

            BadRequestException exception = assertThrows(BadRequestException.class, () -> {
                carteiraAcaoService.buyAcao(buyDto);
            });

            assertEquals("Carteira não encontrada na base de dados.", exception.getMessage());
            verify(usuarioService, never()).removeSaldo(anyDouble());
            verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
            verify(historicoTransacaoRepository, never()).save(any(HistoricoTransacao.class));
        }

        @Test
        public void testBuyAcao_InsufficientBalance() {
            when(acaoService.findById(buyDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(buyDto.getIdCarteira())).thenReturn(carteira);
            doThrow(new BadRequestException("Saldo insuficiente para realizar esta transação!"))
                    .when(usuarioService).removeSaldo(anyDouble());

            BadRequestException exception = assertThrows(BadRequestException.class, () -> {
                carteiraAcaoService.buyAcao(buyDto);
            });

            assertEquals("Saldo insuficiente para realizar esta transação!", exception.getMessage());
            verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
            verify(historicoTransacaoRepository, never()).save(any(HistoricoTransacao.class));
        }
    }

    @Nested
    class testSellAcao {
        private SellAcaoDTO sellDto;
        private CarteiraAcao carteiraAcao;
        @BeforeEach
        public void setup() {
            sellDto = MockEntityFactory.createSellAcaoDTO(1L, 1L, 5);
            carteiraAcao = MockEntityFactory.createCarteiraAcao(10, acao, carteira);
        }

        @Test
        public void testSellAcao_OK() {
            when(acaoService.findById(sellDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(sellDto.getIdCarteira())).thenReturn(carteira);
            when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.of(carteiraAcao));

            carteiraAcaoService.sellAcao(sellDto);

            assertEquals(5, carteiraAcao.getQuantidade());
            verify(usuarioService).addSaldo(acao.getPreco() * sellDto.getQuantidade());
            verify(carteiraAcaoRepository).save(carteiraAcao);
            verify(historicoTransacaoRepository).save(any(HistoricoTransacao.class));
        }

        @Test
        public void testSellAcao_InsufficientQuantity() {
            when(acaoService.findById(sellDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(sellDto.getIdCarteira())).thenReturn(carteira);
            when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.of(carteiraAcao));

            sellDto.setQuantidade(15); // Attempt to sell more than owned

            BadRequestException exception = assertThrows(BadRequestException.class, () -> {
                carteiraAcaoService.sellAcao(sellDto);
            });

            assertEquals("Quantidade insuficiente para venda", exception.getMessage());
            verify(usuarioService, never()).addSaldo(anyDouble());
            verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
            verify(historicoTransacaoRepository, never()).save(any(HistoricoTransacao.class));
        }

        @Test
        public void testSellAcao_AcaoNotFoundInCarteira() {
            when(acaoService.findById(sellDto.getIdAcao())).thenReturn(acao);
            when(carteiraService.findById(sellDto.getIdCarteira())).thenReturn(carteira);
            when(carteiraAcaoRepository.findByCarteiraIsAndAcaoIs(carteira, acao)).thenReturn(Optional.empty());

            BadRequestException exception = assertThrows(BadRequestException.class, () -> {
                carteiraAcaoService.sellAcao(sellDto);
            });

            assertEquals("Ação não encontrada na carteira", exception.getMessage());
            verify(usuarioService, never()).addSaldo(anyDouble());
            verify(carteiraAcaoRepository, never()).save(any(CarteiraAcao.class));
            verify(historicoTransacaoRepository, never()).save(any(HistoricoTransacao.class));
        }
    }
}
