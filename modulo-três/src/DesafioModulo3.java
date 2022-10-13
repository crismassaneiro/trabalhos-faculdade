import java.util.Arrays;

public class DesafioModulo3 {
    public static int pesquisaBinariaR(int[] array,
                                       int valor,
                                       int inf,
                                       int sup) {
        /*
        * @param array : array para fazer a pesquisa de elemento
        * @param valor : elemento a ser pesquisado no array
        * @param inf : numero do elemento inicial do array para pesquisa
        * @param sup : numero do elemento final do array para pesquisa
        * @return : -1 caso não encontrado o elemento ou
        *           med que é o índico do elmento caso encontrado
        */

        int med = (inf + sup)/2;

        if(sup < inf){
            return -1;
        }

        if (valor < array[med]){
            return pesquisaBinariaR(array, valor, inf, med - 1);
        }

        if (valor > array[med]){
            return pesquisaBinariaR(array, valor, med + 1, sup);
        }

        if (valor == array[med]){
            return med;
        }

        return -1;
    }

    public static void ordSelecaoDiretaR(int[] array,
                                         int inicio,
                                         int fim) {
        /*
         * @param array : array para ser executada a ordenação
         * @param inicio : primeiro elemento do array (ou primeiro elemento para ordenação)
         * @param fim : último elemento do array (ou último elemento para ordenação)
         * @return : Sem retorno. O próprio array ficará ordenado.
         */

        int min = inicio;
        for (int j = inicio + 1; j < fim; j++)
        {
            if (array[j] < array[min]) {
                min = j;
            }
        }

        int temp = array[min];
        array[min] = array[inicio];
        array[inicio] = temp;

        if (inicio + 1 < fim) {
            ordSelecaoDiretaR(array, inicio + 1, fim);
        }
    }

    public static void ordInsercaoDiretaR(int[] array,
                                          int inicio,
                                          int fim) {
        /*
         * @param array : array para ser executada a ordenação
         * @param inicio : primeiro elemento do array (ou primeiro elemento para ordenação)
         * @param fim : último elemento do array (ou último elemento para ordenação)
         * @return : Sem retorno. O próprio array ficará ordenado.
         */

        int valor = array[inicio];
        int j = inicio;

        while (j > 0 && array[j - 1] > valor) {
            array[j] = array[j - 1];
            j--;
        }

        array[j] = valor;

        if (inicio + 1 <= fim) {
            ordInsercaoDiretaR(array, inicio + 1, fim);
        }
    }

    public static void main(String[] args) {
        int[] array1 = {1, -2, 8, 5, 4, 9};
        int inf = 0;
        int sup = array1.length;
        int result = pesquisaBinariaR(array1, 5 , inf , sup);
        System.out.println("O índice do elemento procurado é: " + result);

        int[] array2 = {1, -2, 8, 4, 9, 5};
        int inf2 = 0;
        int sup2 = array2.length;
        ordSelecaoDiretaR(array2, inf2, sup2);
        System.out.println("O array ordenado por seleção direta é o: " + Arrays.toString(array2));

        int[] array3 = {1, -2, 8, 4, -9, 5};
        int inf3 = 1; // o primeiro elemento já está ordenado por isso começamos do segundo elemento
        int sup3 = array3.length - 1;
        ordInsercaoDiretaR(array3, inf3, sup3);
        System.out.println("O array ordenado por inserção direta é o: " + Arrays.toString(array3));

    }

}