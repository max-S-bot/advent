;; sbcl --script code-2025/day2.cl

(require :uiop)

(defvar *str-arr* (
    uiop:split-string (
        uiop:read-file-string #p"data-2025/day2.txt") :separator ",") )
(defvar *arr-data* (mapcar #'(lambda (rng) 
        (let ((i (position #\- rng)))
        (cons (parse-integer (subseq rng 0 i)) (parse-integer (subseq rng (+ i 1))) )
        )) *str-arr*) )
(terpri)

(let ((sum 0) (s))
    (loop for rng in *arr-data* do
        (loop for i from (car rng) to (cdr rng) do
            (setf s (write-to-string i))
            (if (string= 
                    (subseq s 0 (floor (length s) 2)) 
                    (subseq s (floor (length s) 2)))
                (incf sum i))))
    (print sum)
    (terpri))

(defun repeat-str (str n) 
    (let ((repeated ""))
        (loop for i from 1 to n do 
            (setf repeated (concatenate 'string repeated str))
        )
        (concatenate 'string repeated "")))

(let ((sum 0) (s) (l) (flag))
    (loop for rng in *arr-data* do
        (loop for i from (car rng) to (cdr rng) do
            (setf flag nil)
            (setf s (write-to-string i))
            (setf l (length s))
            (loop for j from 1 to (floor l 2) do
                (if (string= s (repeat-str (subseq s 0 j) (floor l j))) (setf flag t)))
            (if flag (incf sum i))))
    (print sum)
    (terpri))



#|
long newSum = 0;
for (var rng : arrData) 
    for (long i=rng[0]; i<=rng[1]; i++) {
        var s = String.valueOf(i);
        var l = s.length();
        for (int j=1; j<=l/2; j++)
            if (s.substring(0, j).repeat(l/j).equals(s)) {
                newSum += i;
                break;
            }
    }
IO.println(newSum);
 |#