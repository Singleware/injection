import { Constructor, ClassDecorator } from './types';
import { Settings } from './settings';
/**
 * Dependency manager class.
 */
export declare class Manager {
    /**
     * Map of singleton instances.
     */
    private instances;
    /**
     * Map of dependencies.
     */
    private dependencies;
    /**
     * Decorates the specified class to be a dependency class.
     * @param settings Dependency settings.
     * @returns Returns the decorator method.
     */
    Describe(settings?: Settings): ClassDecorator;
    /**
     * Decorates the specified class to be injected by the specified dependencies.
     * @param list List of dependencies.
     * @returns Returns the decorator method.
     */
    Inject(...list: Constructor<any>[]): ClassDecorator;
    /**
     * Resolves the current instance of the specified class type.
     * @param type Class type.
     * @throws Throws a type error when the class type does not exists in the dependencies.
     * @returns Returns the resolved instance.
     */
    resolve<T extends Object>(type: Constructor<T>): T;
    /**
     * Constructs a new instance of the specified class type.
     * @param type Class type.
     * @param parameters Initial parameters.
     * @returns Returns a new instance of the specified class type.
     */
    construct<T extends Object>(type: Constructor<T>, ...parameters: any[]): T;
}
