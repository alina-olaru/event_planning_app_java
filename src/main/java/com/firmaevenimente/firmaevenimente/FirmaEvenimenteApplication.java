package com.firmaevenimente.firmaevenimente;

import com.firmaevenimente.firmaevenimente.models.User;
import com.firmaevenimente.firmaevenimente.repositories.TestRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;
import java.util.List;

import static java.lang.System.exit;

@SpringBootApplication
public class FirmaEvenimenteApplication  {

	public static void main(String[] args) {
		SpringApplication.run(FirmaEvenimenteApplication.class, args);
	}

}
