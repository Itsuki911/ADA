class LinearRegression:
    def __init__(self):
        self.coefficients = None

    def fit(self, X, y):
        # Fit the model to the data
        X_b = self._add_bias(X)
        self.coefficients = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

    def predict(self, X):
        # Make predictions using the fitted model
        X_b = self._add_bias(X)
        return X_b.dot(self.coefficients)

    def _add_bias(self, X):
        # Add a bias term to the input features
        return np.c_[np.ones((X.shape[0], 1)), X]

class PolynomialRegression:
    def __init__(self, degree):
        self.degree = degree
        self.coefficients = None

    def fit(self, X, y):
        # Fit the polynomial regression model to the data
        X_poly = self._polynomial_features(X)
        X_poly_b = self._add_bias(X_poly)
        self.coefficients = np.linalg.inv(X_poly_b.T.dot(X_poly_b)).dot(X_poly_b.T).dot(y)

    def predict(self, X):
        # Make predictions using the fitted polynomial model
        X_poly = self._polynomial_features(X)
        X_poly_b = self._add_bias(X_poly)
        return X_poly_b.dot(self.coefficients)

    def _polynomial_features(self, X):
        # Generate polynomial features
        return np.array([X**i for i in range(1, self.degree + 1)]).T

    def _add_bias(self, X):
        # Add a bias term to the input features
        return np.c_[np.ones((X.shape[0], 1)), X]

# Additional regression techniques can be added here as needed.