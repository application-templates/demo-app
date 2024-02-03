/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import './App.css';
import React, { useEffect, useState } from 'react';

export function App() {
  const [result, setResult] = useState(null);
  const [now, setNow] = useState(null);

  const fetchTime = () => {
    fetch("/time")
      .then(res => {
        const contentType = res.headers.get("Content-Type");
        if (contentType != "application/json") {
          throw new Error(`API Request returned ${res.status}: ${res.statusText} and unrecognized Content-Type: ${contentType}`);
        }

        return res.json();
      })
      .then(result => {
        setResult(result);
        setNow(new Date(result.now));
      })
      .catch(error => {
        setResult({
          error: error.toString(),
        });
      })
  }

  useEffect(fetchTime, []);

  return (
    <div className="App">
      {result && result.error &&
        <p>Error: {result.error}</p>
      }
      {result && !result.error &&
        <>
          <h1>{result.message || "Hello, World!"}</h1>
          {
            now && <p>
              Server Date: {now.toLocaleDateString()} <br />
              Server Time: {now.toLocaleTimeString()}
            </p>
          }
        </>
      }
      <button onClick={fetchTime} className="button">
        Refresh
      </button>
      <div className="Footer">App Templating Demo Application</div>
    </div>
  );
}
