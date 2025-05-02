/**
 * Represents a user entity in the domain model.
 * Core domain entity that encapsulates the essential attributes of a user
 * in the application, following domain-driven design principles.
 */
export interface User {
  /** Email address of the user, used for identification and communication */
  email: string;
  /** Unique identifier for the user */
  id: string;
  /** Full name of the user */
  name: string;
}

/**
 * Repository interface for User entity, following the hexagonal architecture pattern.
 * Defines the contract for persistence operations on User entities.
 * This abstraction allows the domain to remain isolated from specific
 * infrastructure implementations (database, API, etc.).
 */
export interface UserRepository {
  /**
   * Creates a new user in the repository.
   * @param user - User data object without the id property (will be generated)
   * @returns Promise resolving to the created User entity with assigned id
   * @throws Error if user creation fails (e.g., duplicate email)
   */
  create(user: Omit<User, "id">): Promise<User>;

  /**
   * Deletes a user from the repository by their id.
   * @param id - Unique identifier of the user to delete
   * @returns Promise resolving to boolean indicating whether deletion was successful
   */
  delete(id: string): Promise<boolean>;

  /**
   * Retrieves all users from the repository.
   * @returns Promise resolving to an array of User entities
   */
  findAll(): Promise<User[]>;

  /**
   * Finds a user by their unique identifier.
   * @param id - Unique identifier of the user to find
   * @returns Promise resolving to the User entity if found, or null if not found
   */
  findById(id: string): Promise<null | User>;

  /**
   * Updates an existing user's information.
   * @param id - Unique identifier of the user to update
   * @param user - Partial user data containing only the fields to be updated
   * @returns Promise resolving to the updated User entity, or null if user not found
   */
  update(id: string, user: Partial<Omit<User, "id">>): Promise<null | User>;
}
