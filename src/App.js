import React from 'react';
import './style.css';

export default function App() {
  const model = [
    {
      Timestamp: 'Tue Aug 24 2021 12:17',
      Type: 'media',
      Sender: 'student',
      Content:
        'https://media.kunduz.com/media/question/raw/20210824091747018738-624037.jpg',
      Name: 'Gökdeniz ERDEN ',
      ID: '578724',
      Q_ID: '53663427'
    },
    {
      Timestamp: 'Tue Aug 24 2021 12:21',
      Type: 'media',
      Sender: 'teacher',
      Content:
        'https://media.kunduz.com/media/answer/raw/20200626141025070890-1465272.jpg',
      Name: 'Visio Teacher',
      ID: '11433',
      Q_ID: '(Q: 53663427)'
    },
    {
      Timestamp: 'Tue Aug 24 2021 12:24',
      Type: 'text',
      Sender: 'student',
      Content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      Name: 'Gökdeniz ERDEN',
      ID: '578724',
      Q_ID: '(Q: 53663427)'
    },
    {
      Timestamp: 'Tue Aug 24 2021 12:52',
      Type: 'text',
      Sender: 'system',
      Content: '(To student) Çözüm değerlendirildi 👍',
      Name: 'system',
      ID: '0',
      Q_ID: '(Q: 53663427)'
    },
    {
      Timestamp: 'Tue Aug 24 2021 12:52',
      Type: 'text',
      Sender: 'system',
      Content: '(To tutor) Çözüm değerlendirildi 👍',
      Name: 'system',
      ID: '0',
      Q_ID: '(Q: 53663427)'
    },
    {
      Timestamp: 'Tue Aug 24 2021 12:52',
      Type: 'text',
      Sender: 'system',
      Content: '(To tutor) Kazanç yansıtıldı: ₺ 0,50',
      Name: 'system',
      ID: '0',
      Q_ID: '(Q: 53663427)'
    }
  ];

  class Zoom extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        zoom: false,
        mouseX: null,
        mouseY: null
      };

      const { height, img, transitionTime, width } = props;

      this.outerDivStyle = {
        height: `${height}px`,
        width: `${width}px`,
        overflow: 'hidden'
      };

      this.imageRef = React.createRef();

      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
      this.handleMouseMovement = this.handleMouseMovement.bind(this);
    }

    handleMouseOver() {
      this.setState({
        zoom: true
      });
    }

    handleMouseOut() {
      this.setState({
        zoom: false
      });
    }

    handleMouseMovement(e) {
      const {
        left: offsetLeft,
        top: offsetTop
      } = this.imageRef.current.getBoundingClientRect();

      const {
        current: {
          style: { height, width }
        }
      } = this.imageRef;
      const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
      const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;
      this.setState({
        mouseX: x,
        mouseY: y
      });
    }

    calculateTransformOrigin() {
      const { mouseX, mouseY, zoom } = this.state;
      switch (this.props.rotateDegree) {
        case 0:
          return `${mouseX}% ${mouseY}%`;
        case 90:
          return `${mouseY}% ${100 - mouseX}%`;
        case 180:
          return `${100 - mouseX}% ${100 - mouseY}%`;
        case 270:
          return `${100 - mouseY}% ${mouseX}%`;
      }
    }

    render() {
      const { mouseX, mouseY, zoom } = this.state;

      const { zoomScale } = this.props;

      const styles = {
        exampleStyle: {
          transformOrigin: this.calculateTransformOrigin(),
          height: `${this.props.height}px`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
          transition: `transform ${this.props.transitionTime}s ease-out`,
          backgroundImage: `url('${this.props.img}')`,
          transform: zoom ? `scale(${this.props.zoomScale})` : 'scale(1.0)'
        }
      };
      return (
        <div
          style={this.outerDivStyle}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onMouseMove={this.handleMouseMovement}
          ref={this.imageRef}
        >
          <div style={styles.exampleStyle} className="zoomImg" />
        </div>
      );
    }
  }

  class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        degree: 0
      };
      this.rotate90clockwise = this.rotate90clockwise.bind(this);
      this.rotate90anticlockwise = this.rotate90anticlockwise.bind(this);
    }

    rotate90clockwise() {
      this.setState({
        degree: this.state.degree > 180 ? 0 : this.state.degree + 90
      });
    }
    rotate90anticlockwise() {
      this.setState({
        degree: this.state.degree < -180 ? 0 : this.state.degree - 90
      });
    }

    render() {
      return (
        <div
          class="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            />
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                
                <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-x-4 ">
                    <button onClick={this.rotate90anticlockwise}>
                      <svg
                        class="text-gray-600  text-lg"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.52,3.43A9.09,9.09,0,0,0,5.7,5.55V2.35H4.07v6.5h6.5V7.21H6.3a7.46,7.46,0,1,1-1.47,8.65l-1.46.73A9.11,9.11,0,1,0,11.52,3.43Z" />
                      </svg>
                    </button>
                    <button class="bg-gray-400 p-1 px-2 rounded-lg font-semibold text-gray-100 hover:text-gray-400 hover:bg-gray-100 transition-colors"><a href={'https://kunduz.retool.com/editor/DEV%20-%20Tech/Image%20Viewer#url=' + this.props.image + '?type=wm'} target="_blank">Show Image</a></button>
                    <button onClick={this.rotate90clockwise}>
                      <svg
                        class="text-gray-600 text-lg"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.48,3.43A9.09,9.09,0,0,1,18.3,5.55V2.35h1.64v6.5h-6.5V7.21H17.7a7.46,7.46,0,1,0,1.47,8.65l1.46.73A9.11,9.11,0,1,1,12.48,3.43Z" />
                      </svg>
                    </button>
                  </div>
                  <button onClick={this.props.closeModal}>
                    <svg
                      class="text-gray-600  text-lg"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                    </svg>
                  </button>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <span class="text-sm text-gray-500">
                      <div
                        style={{ transform: `rotate(${this.state.degree}deg)` }}
                      >
                        <Zoom
                          img={this.props.image + '?type=wm'}
                          zoomScale={2}
                          height={400}
                          width={400}
                          transitionTime={0.5}
                          rotateDegree={this.state.degree}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  class Message extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: false
      };
      this.showModal = this.showModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    showModal() {
      this.setState({ showModal: true });
    }
    closeModal() {
      this.setState({ showModal: false });
    }

    render() {
      if (this.props.contentTextType == 'media') {
        var content = (
          <div class="flex justify-center">
            <button onClick={this.showModal}>
              <img
                class="max-w-full max-h-64"
                src={this.props.contentText + '?type=wm'}
              />
            </button>
            {this.state.showModal ? (
              <Modal
                closeModal={this.closeModal}
                image={this.props.contentText}
              />
            ) : null}
          </div>
        );
      } else {
        var content = this.props.contentText;
      }

      if (this.props.sender == 'teacher') {
        var position = 'left';
        var name = (
          <a
            href={
              'https://kunduz.retool.com/apps/Support/Teacher%20Details#teacher_id=' +
              this.props.t_or_s_id
            }
            target="_blank"
          >
            <div class="text-sm font-semibold" style={{ color: '#01CCBC' }}>
              {' '}
              {this.props.name}{' '}
            </div>
          </a>
        );
        var image_src = 'https://via.placeholder.com/64/01CCBC/FFFFFF?text=T';
      }
      if (this.props.sender == 'student') {
        var position = 'right';
        var name = (
          <a
            href={
              'https://kunduz.retool.com/apps/Support/Student%20Details#student_id=' +
              this.props.t_or_s_id
            }
            target="_blank"
          >
            <div class="text-sm font-semibold" style={{ color: '#2B81FC' }}>
              {' '}
              {this.props.name}{' '}
            </div>
          </a>
        );
        var image_src = 'https://via.placeholder.com/64/2B81FC/FFFFFF?text=S';
      }
      if (this.props.sender == 'system') {
        var position = 'left';
        var name = <div class="text-sm font-semibold"> SYSTEM </div>;
        var image_src = 'https://via.placeholder.com/64/2E3333/FFFFFF?text=!';
      }
      var time = this.props.time;
      return (
        <div
          class={
            'flex flex-col bg-gray-200 rounded-xl w-64 my-4 mx-16' +
            (position == 'right' ? ' self-end' : ' self-start')
          }
        >
          <div class="flex flex-row justify-between m-2">
            <div class="text-sm font-semibold"> {name} </div>
            <div class="text-xs text-gray-700"> {time} </div>
          </div>
          <img
            class={
              'w-12 h-12 bg-gray-200 rounded-full -mx-14 relative -top-9' +
              (position == 'right' ? ' self-end' : ' self-start')
            }
            src={image_src}
            alt="User Avatar"
          />
          <hr class="border-1 -mt-12 border-gray-300" />
          <p class="p-4 text-sm">{content}</p>
        </div>
      );
    }
  }
  return (
    <div class="iphone-x">
      <i />
      <b />
      <div
        class="flex flex-col bg-gray-300 w-full h-full"
        style={{ borderRadius: '40px' }}
      >
        <div
          class="flex bg-gray-600 justify-between"
          style={{ borderRadius: '40px 40px 0 0' }}
        >
          <span class="mx-8 my-1 text-gray-300 text-xs">9:41</span>
          <span class="py-6 font-bold text-gray-300 text-sm mt-4 hover:text-gray-400">
            <a
              href={
                'https://kunduz.retool.com/apps/Support/Question%20Details#question_id=' +
                model[0].Q_ID
              }
              target="_blank"
            >
              Question ID: {model[0].Q_ID}
            </a>
          </span>

          <span class="flex mx-8 my-1 text-gray-200 text-sm w-8 h-8">
            <svg
              class=""
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1em"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z"
                clip-rule="evenodd"
              />
              <path d="M2 6h5v4H2V6zm12.5 3.5a1.5 1.5 0 000-3v3z" />
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="0.9em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.671,14.307C16.184,12.819,14.17,12,12,12s-4.184,0.819-5.671,2.307l1.414,1.414c1.11-1.11,2.621-1.722,4.257-1.722 c1.636,0.001,3.147,0.612,4.257,1.722L17.671,14.307z" />
              <path d="M20.437,11.292c-4.572-4.573-12.301-4.573-16.873,0l1.414,1.414c3.807-3.807,10.238-3.807,14.045,0L20.437,11.292z" />
              <circle cx="12" cy="18" r="2" />
            </svg>
          </span>
        </div>

        <div class="flex flex-col overflow-scroll	overflow overflow-x-hidden pt-4 h-full">
          {model.map(m => {
            return (
              <Message
                contentText={m.Content}
                sender={m.Sender}
                time={m.Timestamp}
                contentTextType={m.Type}
                name={m.Name}
                t_or_s_id={m.ID}
                q_id={m.Q_ID}
              />
            );
          })}
        </div>

        <div style={{ height: '72px' }}>
          <div
            class="flex flex-row bg-gray-100 w-full"
            style={{
              borderBottomLeftRadius: '40px',
              borderBottomRightRadius: '40px',
              height: '72px'
            }}
          >
            <span class="px-4">
              <svg
                class="text-gray-500 cursor-pointer hover:text-gray-700"
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="3.5em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span class="mt-4 mx-8 text-gray-400">Type your messages…</span>
            <span class="mt-4 ml-2 font-semibold text-blue-500 cursor-pointer hover:text-blue-700">
              Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
