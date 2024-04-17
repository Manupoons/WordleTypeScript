interface INotifier<T>{
    registrarObservador(observador: IObserver<T>): void;
    eliminarObservador(observador: IObserver<T>): void;
    notificar(parameter: T): void;
}