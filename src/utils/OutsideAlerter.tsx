import React, { Component } from 'react'

interface OutsideAlerterProps {
    children: React.ReactNode
    onClickOutside: () => void
}

export default class OutsideAlerter extends Component<OutsideAlerterProps> {
    private wrapperRef: React.RefObject<HTMLDivElement | null>

    constructor(props: OutsideAlerterProps) {
        super(props)

        this.wrapperRef = React.createRef<HTMLDivElement>()
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleClickOutside(event: MouseEvent) {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target as Node)) {
            this.props.onClickOutside()
        }
    }

    render() {
        return <div ref={this.wrapperRef}>{this.props.children}</div>
    }
}
