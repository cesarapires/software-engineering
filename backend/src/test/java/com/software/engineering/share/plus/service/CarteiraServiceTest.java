package com.software.engineering.share.plus.service;

import com.software.engineering.share.plus.exception.BadRequestException;
import com.software.engineering.share.plus.model.Carteira;
import com.software.engineering.share.plus.repository.CarteiraAcaoRepository;
import com.software.engineering.share.plus.repository.CarteiraRepository;
import com.software.engineering.share.plus.util.MockEntityFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CarteiraServiceTest {

    @Mock
    private CarteiraRepository carteiraRepository;

    @Mock
    private CarteiraAcaoRepository carteiraAcaoRepository;

    @InjectMocks
    private CarteiraService carteiraService;

    private Carteira carteira;

    @BeforeEach
    public void setup() {
        carteira = MockEntityFactory.createCarteira(1L);
    }

    @Test
    public void testDeleteCarteiraIfEmpty_Success() {
        when(carteiraRepository.findById(1L)).thenReturn(Optional.of(carteira));
        when(carteiraAcaoRepository.existsByCarteira(carteira)).thenReturn(false);

        carteiraService.deleteCarteiraIfEmpty(1L);

        verify(carteiraRepository).delete(carteira);
    }

    @Test
    public void testDeleteCarteiraIfEmpty_HasAcoes() {
        when(carteiraRepository.findById(1L)).thenReturn(Optional.of(carteira));
        when(carteiraAcaoRepository.existsByCarteira(carteira)).thenReturn(true);

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            carteiraService.deleteCarteiraIfEmpty(1L);
        });

        assertEquals("Não é possível excluir a carteira pois ela contém ações", exception.getMessage());
        verify(carteiraRepository, never()).delete(carteira);
    }
}
