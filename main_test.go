package main

import "testing"

func DummyTest(t *testing.T) {

	// This is a dummy test to ensure the package compiles and can be run.
	// You can add actual tests here later.

	// t.Log("Dummy test passed")

	t.Fatal("Failed test")
	t.Log("Dummy test failed")

}
