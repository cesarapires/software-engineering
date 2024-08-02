package com.software.engineering.share.plus.controller;

import com.software.engineering.share.plus.dto.request.LoginDTO;
import com.software.engineering.share.plus.dto.request.RegisterUserDTO;
import com.software.engineering.share.plus.dto.response.LoginResponseDTO;
import com.software.engineering.share.plus.model.Usuario;
import com.software.engineering.share.plus.service.AuthenticationService;
import com.software.engineering.share.plus.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${api-prefix}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<Usuario> register(@RequestBody RegisterUserDTO registerUserDto) {
        Usuario registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> authenticate(@RequestBody LoginDTO loginUserDto) {
        Usuario authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponseDTO loginResponse = new LoginResponseDTO(jwtToken, jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/is-logged-in")
    public ResponseEntity<LoginResponseDTO> isLoggedIn(HttpServletRequest request) {
        if (jwtService.isTokenValid(request.getHeader("Authorization"))) {
            Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String jwtToken = jwtService.generateToken(usuario);
            LoginResponseDTO loginResponse = new LoginResponseDTO(jwtToken, jwtService.getExpirationTime());

            return ResponseEntity.ok(loginResponse);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        authenticationService.logout(request);
    }
}
