<?php

namespace App\Libraries;

trait CacheMethods {

    /**
     * Cache store for classes
     */
    protected $_cache = [];  // TODO: change static property to meta maintenance

    /**
     * Singleton of methods called as properties
     */
    public function __get($property) {
        try {
            if (!isset($this->_cache['_property__' . $property])) {
                $value_from_parent = parent::__get($property);
                $this->_cache['_property__' . $property] = $value_from_parent;
            }
            return $this->_cache['_property__' . $property];
        } catch (\Exception $e) {}
        if (method_exists($this, $property)) {
            if (!isset($this->_cache['_property__' . $property])) {
                $this->_cache['_property__' . $property] = $this->$property();
            }
            return $this->_cache['_property__' . $property];
        }
        return parent::__get($property);
    }

    /**
     * if called method is private, then it makes a singleton of
     * returned values from method.
     */
    public function __call($method, $parameters) {
        if (method_exists($this, $method)) {
            if (!isset($this->_cache['_method__' . $method])) {
                $this->_cache['_method__' . $method] = [
                    '@parameters' => $parameters,
                    '@response' => call_user_func_array([$this, $method], $parameters)
                ];
            } else if ($this->_cache['_method__' . $method]['@parameters'] !== $parameters) {
                $this->_cache['_method__' . $method] = [
                    '@parameters' => $parameters,
                    '@response' => call_user_func_array([$this, $method], $parameters)
                ];
            }
            return $this->_cache['_method__' . $method]['@response'];
        }
        return parent::__call($method, $parameters);
    }
}
