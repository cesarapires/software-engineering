package com.software.engineering.share.plus.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.software.engineering.share.plus.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;


@NoArgsConstructor
@Entity
@Table(name = "usuario", schema = "share_plus")
@Getter
@Setter
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private Double saldo;

    @Column(nullable = false)
    @Getter(AccessLevel.NONE)
    private String senha;

    @Column(nullable = false)
    private LocalDateTime dataCadastro;

    @Column(nullable = false)
    private LocalDateTime dataAtualizacao;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
    private Set<HistoricoCompras> historicoCompras;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
    private Set<Carteira> carteiras;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Usuario(Long id) {
        this.id = id;
    }

    public void checkSaldo(Double valor) {
        if (!(this.saldo != null && this.saldo >= valor)) {
            throw new BadRequestException("Saldo insuficiente para realizar esta transação!");
        }
    }
}
