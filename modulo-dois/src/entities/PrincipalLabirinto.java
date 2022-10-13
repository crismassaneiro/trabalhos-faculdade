package entities;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class PrincipalLabirinto {
	public static void main(String[] args) {

		try (Scanner scan = new Scanner(System.in)) {
			System.out.println("Digite o nome do arquivo:");
			String filename = scan.nextLine();
			Labirinto labirinto = new Labirinto();

			// EX: labirinto.carregaLabirinto(filename); LabirintoFile.txt

			File file = new File("./src/resources/saidaLabirinto.txt");
			FileWriter fileWriter = new FileWriter(file);
			PrintWriter out = new PrintWriter(fileWriter);
			boolean existeCaminho = labirinto.labirinto(filename);

			if (existeCaminho) {
				out.print("Existe um caminho para o labirinto!");
			} else {
				out.print("Não existe um caminho para o labirinto!");
			}
			out.close();

			System.out.println(labirinto.toString());

		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Erro ao escrever o arquivo!");
		}
	}
}
