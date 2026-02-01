import { render, screen } from '@testing-library/react'

describe('Smoke Test', () => {
  it('renders a simple component', () => {
    render(<div data-testid="smoke">Hello World</div>)
    const element = screen.getByTestId('smoke')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Hello World')
  })
})
