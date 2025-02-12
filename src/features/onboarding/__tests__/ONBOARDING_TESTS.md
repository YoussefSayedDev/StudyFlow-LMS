# Onboarding Slice Tests

## Test Coverage Checklist

### Initial State

- [x] Should have correct initial values for all properties
- [x] Should have correct step structure
- [x] Should have correct loading states

### Reducers

- [ ] nextStep
  - [ ] Should increment step when conditions met
  - [ ] Should not exceed MAX_STEPS
  - [ ] Should only proceed if current step is complete
- [ ] prevStep
  - [ ] Should decrement step
  - [ ] Should not go below step 1
- [ ] setRole
  - [ ] Should set correct role
  - [ ] Should maintain other state properties
- [ ] resetOnboarding
  - [ ] Should reset to initial state

### Thunks

- [ ] submitGeneralInfo
  - [ ] Should handle successful submission
  - [ ] Should handle API errors
  - [ ] Should update loading state
  - [ ] Should proceed to next step on success
- [ ] submitRoleSelection
  - [ ] Should handle successful submission
  - [ ] Should handle API errors
  - [ ] Should update loading state
- [ ] submitStudentDetails
  - [ ] Should handle successful submission
  - [ ] Should handle API errors
  - [ ] Should update loading state
- [ ] submitTeacherDetails
  - [ ] Should handle successful submission
  - [ ] Should handle API errors
  - [ ] Should update loading state
- [ ] submitParentDetails
  - [ ] Should handle successful submission
  - [ ] Should handle API errors
  - [ ] Should update loading state
- [ ] submitConfirmation
  - [ ] Should handle successful submission
  - [ ] Should handle API errors
  - [ ] Should update loading state
  - [ ] Should mark onboarding as complete

### Selectors

- [ ] selectCurrentStep
- [ ] selectLoadingState
- [ ] selectError
- [ ] selectIsComplete
- [ ] selectGeneralInfo
- [ ] selectRole
- [ ] selectDetails
- [ ] selectIsStepComplete
- [ ] selectCurrentStepData

### Type Guards

- [ ] isStudentDetails
- [ ] isTeacherDetails
- [ ] isParentDetails

### Integration Scenarios

- [ ] Complete student onboarding flow
- [ ] Complete teacher onboarding flow
- [ ] Complete parent onboarding flow
- [ ] Handle API failures during flow
- [ ] Verify step progression logic

## Test Patterns to Follow

1. Arrange-Act-Assert pattern
2. Mock API calls consistently
3. Test error scenarios
4. Verify state transitions
5. Check loading states
6. Validate error handling

## Useful Test Data

- Mock API responses
- Sample user data for each role
- Common error scenarios

## Notes

- Remember to test edge cases
- Verify error messages
- Check loading state transitions
- Test validation logic
