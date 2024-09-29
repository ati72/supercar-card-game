package com.d2ovj9.supercarcardgame.seed;

import com.d2ovj9.supercarcardgame.entity.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Set;

@Transactional
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationListener<ApplicationReadyEvent> {
    private final RoleRepository _roleRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Set<String> defaultRoles = Set.of("ROLE_ADMIN", "ROLE_USER");
        createDefaultRoles(defaultRoles);
    }

    private void createDefaultRoles(Set<String> roles) {
        roles.stream()
                .filter(role -> _roleRepository.findByName(role).isEmpty())
                .map(Role::new).forEach(_roleRepository::save);
    }
}
